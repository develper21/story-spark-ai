import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { AuthService } from "../src/app/modules/auth/auth.service";
import { User } from "../src/app/modules/user/user.model";
import { OTPModel } from "../src/app/modules/verify_email/otp.model";
import { JwtHalers } from "../src/utils/jwt.helper";
import { GamificationService } from "../src/app/modules/gamification/gamification.service";

jest.mock("bcryptjs", () => ({
  __esModule: true,
  default: { compare: jest.fn() },
}));

jest.mock("../src/app/modules/user/user.model", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("../src/app/modules/verify_email/otp.model", () => ({
  OTPModel: {
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

jest.mock("../src/utils/jwt.helper", () => ({
  JwtHalers: {
    createToken: jest.fn(),
  },
}));

jest.mock("../src/app/modules/gamification/gamification.service", () => ({
  GamificationService: {
    updateDailyStreak: jest.fn().mockResolvedValue(undefined),
  },
}));

jest.mock("../src/config", () => ({
  __esModule: true,
  default: {
    google_client_id: "",
    jwt: {
      secret: "test-secret",
      expires_in: "15m",
      refresh_secret: "test-refresh-secret",
      refresh_expires_in: "7d",
    },
  },
}));

jest.mock("google-auth-library", () => ({
  OAuth2Client: jest.fn().mockImplementation(() => ({
    verifyIdToken: jest.fn(),
  })),
}));

const mockedUser = User as jest.Mocked<typeof User>;
const mockedOtp = OTPModel as jest.Mocked<typeof OTPModel>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const mockedJwt = JwtHalers as jest.Mocked<typeof JwtHalers>;
const mockedGamification = GamificationService as jest.Mocked<
  typeof GamificationService
>;

describe("AuthService.login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects when the account does not exist", async () => {
    mockedUser.findOne.mockResolvedValue(null);

    await expect(
      AuthService.login({ email: "missing@example.com", password: "secret" })
    ).rejects.toMatchObject({ statusCode: httpStatus.NOT_FOUND });
    expect(mockedBcrypt.compare).not.toHaveBeenCalled();
  });

  it("rejects password login for Google-only accounts", async () => {
    mockedUser.findOne.mockResolvedValue({ password: null } as never);

    await expect(
      AuthService.login({ email: "google@example.com", password: "secret" })
    ).rejects.toMatchObject({ statusCode: httpStatus.UNAUTHORIZED });
    expect(mockedBcrypt.compare).not.toHaveBeenCalled();
  });

  it("rejects an incorrect password", async () => {
    mockedUser.findOne.mockResolvedValue({ password: "hashed-password" } as never);
    mockedBcrypt.compare.mockImplementation(async () => false);

    await expect(
      AuthService.login({ email: "writer@example.com", password: "wrong" })
    ).rejects.toMatchObject({ statusCode: httpStatus.UNAUTHORIZED });
    expect(mockedJwt.createToken).not.toHaveBeenCalled();
  });

  it("returns access and refresh tokens for valid credentials", async () => {
    const user = {
      _id: "user-123",
      email: "writer@example.com",
      password: "hashed-password",
      role: "user",
      subscriptionType: "free",
      name: "Writer",
      postsCount: 2,
      tokenVersion: 0,
    };
    mockedUser.findOne.mockResolvedValue(user as never);
    mockedBcrypt.compare.mockImplementation(async () => true);
    mockedJwt.createToken
      .mockReturnValueOnce("access-token")
      .mockReturnValueOnce("refresh-token");

    await expect(
      AuthService.login({ email: user.email, password: "correct" })
    ).resolves.toEqual({
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });
    expect(mockedJwt.createToken).toHaveBeenCalledTimes(2);
    expect(mockedGamification.updateDailyStreak).toHaveBeenCalledWith(user._id);
  });
});

describe("AuthService.register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("requires verified-email proof before checking or creating an account", async () => {
    await expect(
      AuthService.register({ email: "writer@example.com" } as never)
    ).rejects.toMatchObject({ statusCode: httpStatus.UNAUTHORIZED });
    expect(mockedOtp.findOne).not.toHaveBeenCalled();
    expect(mockedUser.create).not.toHaveBeenCalled();
  });

  it("rejects an expired verification token", async () => {
    mockedOtp.findOne.mockResolvedValue({
      verificationTokenExpires: new Date(Date.now() - 1000),
    } as never);

    await expect(
      AuthService.register({
        email: "writer@example.com",
        verificationToken: "expired-token",
      } as never)
    ).rejects.toMatchObject({ statusCode: httpStatus.UNAUTHORIZED });
    expect(mockedUser.findOne).not.toHaveBeenCalled();
  });

  it("creates an account and consumes the verification record", async () => {
    const user = {
      _id: "user-123",
      email: "writer@example.com",
      name: "Writer",
      role: "user",
      subscriptionType: "free",
      postsCount: 0,
      tokenVersion: 0,
    };
    mockedOtp.findOne.mockResolvedValue({
      verificationTokenExpires: new Date(Date.now() + 60_000),
    } as never);
    mockedUser.findOne.mockResolvedValue(null);
    mockedUser.create.mockResolvedValue(user as never);
    mockedOtp.deleteOne.mockResolvedValue({ deletedCount: 1 } as never);
    mockedJwt.createToken
      .mockReturnValueOnce("access-token")
      .mockReturnValueOnce("refresh-token");

    await expect(
      AuthService.register({
        email: user.email,
        name: user.name,
        verificationToken: "valid-token",
      } as never)
    ).resolves.toEqual({
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });
    expect(mockedUser.create).toHaveBeenCalledWith(
      expect.not.objectContaining({ verificationToken: "valid-token" })
    );
    expect(mockedOtp.deleteOne).toHaveBeenCalledWith({ email: user.email });
  });
});
