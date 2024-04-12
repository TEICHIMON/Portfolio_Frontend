const base_config_server = {
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
};

const base_config_client = {
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
