import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const config = {
  env: process.env.NODE_ENV || 'development',
  dbName: process.env.DB_NAME,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};
