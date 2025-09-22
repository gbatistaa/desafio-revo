import express from "express";
import conn from "./database/database";
import productsCrud from "./routes/products-crud.routes";

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use("/products-crud", productsCrud);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port: ${PORT}`);
});

const syncDatabase = async (): Promise<void> => {
  try {
    console.clear();

    await conn.sync({ force: true }); // Only for development phase
  } catch (error) {
    console.log(error);
  }
};

void syncDatabase();

export default app;
