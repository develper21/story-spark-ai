import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL?.trim();

let client: Redis | null = null;
let isConnected = false;
let hasLoggedFailure = false;

if (redisUrl) {
  try {
    client = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      retryStrategy(times) {
        if (times > 3) {
          if (!hasLoggedFailure) {
            console.warn("[Redis] Max connection retries reached. Operating without cache.");
            hasLoggedFailure = true;
          }
          return null; // Stop retrying
        }
        return Math.min(times * 1000, 3000);
      },
    });

    client.on("connect", () => {
      isConnected = true;
      hasLoggedFailure = false;
      console.log("[Redis] Connected successfully");
    });

    client.on("close", () => {
      isConnected = false;
    });

    client.on("error", (err) => {
      isConnected = false;
      if (!hasLoggedFailure) {
        console.warn("[Redis] Connection warning:", err.message);
      }
    });
  } catch (err) {
    console.warn("[Redis] Failed to initialize client:", err);
  }
}

// Safe fallback interface if REDIS_URL is not configured or server is unreachable
const safeRedis = {
  get: async (key: string): Promise<string | null> => {
    if (!client || !isConnected) return null;
    try {
      return await client.get(key);
    } catch {
      return null;
    }
  },
  set: async (
    key: string,
    value: string,
    mode?: string,
    duration?: number
  ): Promise<string | null> => {
    if (!client || !isConnected) return null;
    try {
      if (mode && duration !== undefined) {
        return await client.set(key, value, mode as any, duration as any);
      }
      return await client.set(key, value);
    } catch {
      return null;
    }
  },
  del: async (key: string): Promise<number> => {
    if (!client || !isConnected) return 0;
    try {
      return await client.del(key);
    } catch {
      return 0;
    }
  },
  on: (event: string, callback: (...args: any[]) => void) => {
    if (client) client.on(event, callback);
    return safeRedis;
  },
};

export default safeRedis;

