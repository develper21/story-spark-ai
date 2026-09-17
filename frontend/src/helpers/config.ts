export const getBaseUrl = (): string => {
  const url = import.meta.env.VITE_BASE_URL;
  if (url && url.trim()) {
    return url.trim().replace(/\/$/, "");
  }

  // Fallback to production backend on Render when deployed
  if (import.meta.env.PROD) {
    return "https://storyspark-service.onrender.com/api/v1";
  }

  return "http://localhost:5000/api/v1";
};

