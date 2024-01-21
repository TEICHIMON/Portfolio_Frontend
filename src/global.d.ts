namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV:
      | "development"
      | "production"
      | "test";
    MONGO: string;
  }
}
