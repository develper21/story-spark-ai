export const resolveSocketUrl = (): string => {
  const socketUrl = import.meta.env.VITE_SOCKET_URL;
  if (socketUrl && socketUrl.trim()) {
    return socketUrl.trim().replace(/\/$/, "");
  }

  if (import.meta.env.PROD) {
    return "https://storyspark-service.onrender.com";
  }

  return "http://localhost:5000";
};

