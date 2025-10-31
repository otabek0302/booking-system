import dotenv from "dotenv";

dotenv.config();

export const env = {
  // Server Configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  
  // Database Configuration
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: parseInt(process.env.DB_PORT || "5432"),
  dbUsername: process.env.DB_USERNAME || "postgres",
  dbPassword: process.env.DB_PASSWORD || "",
  dbName: process.env.DB_NAME || "booking_system",
};
