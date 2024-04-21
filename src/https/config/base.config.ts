const base_config_server = {
  baseURL: "http://backend:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};

const isProduction =
  process.env.NODE_ENV === "production";
const base_config_client = isProduction
  ? {
      baseURL: "/api",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    }
  : {
      baseURL: "http://localhost:3000/api",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    };
const isBuild = typeof window === "undefined";

const base_config = isBuild
  ? base_config_server
  : base_config_client;
export default base_config;
