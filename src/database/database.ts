import { DataSource } from "typeorm";
import { Event, Booking } from "@models/index";
import { env } from "@config/env.config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbName,
  entities: [Event, Booking],
  synchronize: env.nodeEnv === "development",
  logging: env.nodeEnv === "development",
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
