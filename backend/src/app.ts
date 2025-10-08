import * as dotenv from "dotenv";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import conn from "./database/database";
import productsCrud from "./routes/products-crud.routes";

//Backend server instances:
const app = express();
const httpServer = createServer(app);

// Socket.io server instance
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://crud-produtos-revo.netlify.app"],
    methods: ["GET", "POST", "UPDATE", "DELETE"],
  },
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS CONFIGURATION
const allowedOrigins = ["http://localhost:3000", "https://crud-produtos-revo.netlify.app"];

app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
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

httpServer.listen(PORT, () => {
  console.log(`✅ Backend running on port: ${PORT}`);
});

// Event fired as soon as the Socket customer connects:
io.on("connection", (socket: Socket) => {
  console.log(`🟢 Logged in user: ${socket.id}`);

  // Configuring client event listeners:
  socket.on("products", (data: { action: string }) => {
    console.log("Products Socket Invoked!");
    io.emit("products", data);
  });
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
