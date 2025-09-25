import * as dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

import cors from "cors";
import express from "express";
import conn from "./database/database";
import productsCrud from "./routes/products-crud.routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do CORS
const allowedOrigins = ["http://localhost:3000", "https://crud-produtos-revo.netlify.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use("/products-crud", productsCrud);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on port: ${PORT}`);
});

const syncDatabase = async (): Promise<void> => {
  try {
    const isDev = process.env.NODE_ENV !== "production";
    await conn.sync({ force: isDev });
    console.log("✅ Database synced");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};

void syncDatabase();

export default app;
