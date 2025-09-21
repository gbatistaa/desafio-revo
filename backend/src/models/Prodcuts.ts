import { DataTypes, Model } from "sequelize";
import conn from "../database/database";
import { ProductType } from "../interfaces/product.interface";

const Products = conn.define<Model<ProductType>>(
  "Products",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.CITEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  { underscored: false, tableName: "products" },
);

export default Products;
