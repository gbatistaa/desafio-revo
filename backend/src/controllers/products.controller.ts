// src/controllers/ProductsController.ts
import { Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateProductResquestDto } from "../interfaces/dtos/creatable-product-request.dto";
import Products from "../models/Prodcuts";
import { handleControllerError } from "../utils/handleControllerError";
import { createProductSchema, paramsSchema, updateProductSchema } from "../validator/product.validator";
// Import the schemas

class ProductsController {
  public static createProduct = async (req: CreateProductResquestDto, res: Response) => {
    try {
      const validatedData = createProductSchema.parse(req.body);

      const newProduct = await Products.create(validatedData);

      return res.status(201).json({
        message: `Product with id ${newProduct.dataValues.id} created with success!`,
        newProduct: { ...newProduct.dataValues },
      });
    } catch (error: unknown) {
      handleControllerError(error, res);
    }
  };

  public static getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await Products.findAll();
      const productsData = products.map((product) => {
        return product.dataValues;
      });

      return res.status(200).json({ message: "Products found with success!", productsData });
    } catch (error: unknown) {
      handleControllerError(error, res);
    }
  };

  public static getProductById = async (req: Request, res: Response) => {
    try {
      const { id } = paramsSchema.parse(req.params);

      const product = await Products.findOne({ where: { id: id } });

      if (!product) {
        throw new NotFoundError(`Product with id ${id} not found`);
      }

      return res.status(200).json({ message: "Product found with success!", product });
    } catch (error: unknown) {
      handleControllerError(error, res);
    }
  };

  public static deleteProductById = async (req: Request, res: Response) => {
    try {
      const { id } = paramsSchema.parse(req.params);

      const deletedCount = await Products.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new NotFoundError(`Product with id ${id} not found`);
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: unknown) {
      return handleControllerError(error, res);
    }
  };

  public static updateProductById = async (req: Request, res: Response) => {
    try {
      const { id } = paramsSchema.parse(req.params);
      const updateData = updateProductSchema.parse(req.body);

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "No fields to update provided" });
      }

      const [updatedCount] = await Products.update(updateData, { where: { id } });

      if (updatedCount === 0) {
        throw new NotFoundError(`Product with id ${id} not found`);
      }

      return res.status(200).json({ message: "Product updated successfully" });
    } catch (error: unknown) {
      return handleControllerError(error, res);
    }
  };
}

export default ProductsController;
