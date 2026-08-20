import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
    waitForConnections: true,
    connectionLimit: 10,
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "roadtrip",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "road_trip_guru"
});

export { db };
