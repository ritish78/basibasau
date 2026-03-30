import dotenv from "dotenv";
dotenv.config();

export const EXPRESS_SERVER_PORT = process.env.EXPRESS_SERVER_PORT || 5000;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
export const POSRGRES_DATA_URL = process.env.POSTGRES_DATA_URL;
