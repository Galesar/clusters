const config = {
  port: parseInt(process.env.PORT!) || 3000,
  db: {
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DATABASE_NAME: process.env.DB_NAME,
  },
  redisURL: process.env.REDIS_URL,
};

export default config;
