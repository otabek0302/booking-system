import { DataSource } from "typeorm";
import { Event } from "@models/Event";
import { Booking } from "@models/Booking";

import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "booking_system",
  entities: [Event, Booking],
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "migrations",
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};
