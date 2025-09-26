// src/database/database.ts
import * as dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

let storagePath: string;

if (process.env.NODE_ENV === "production") {
  storagePath = path.join("/data", "database.db");
} else {
  storagePath = path.join(__dirname, "database.db");
}

const conn = new Sequelize({
  dialect: "sqlite",
  storage: storagePath,
  logging: false,
});

conn
  .authenticate()
  .then(() => {
    console.log("✅ Database connection established at:", storagePath);
  })
  .catch((error) => {
    console.error("❌ Unable to connect to the database:", error);
  });

export default conn;
