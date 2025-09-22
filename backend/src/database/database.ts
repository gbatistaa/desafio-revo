import { Sequelize } from "sequelize";
const path = require("path");

const conn = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "./database.db"),
  logging: false,
});

conn
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default conn;
