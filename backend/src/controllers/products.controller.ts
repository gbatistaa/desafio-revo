import { Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import { CreateProductResquestDto } from "../interfaces/dtos/creatable-product-request.dto";
import { UpdateProductResquestDto } from "../interfaces/dtos/updatable-product-request.dto";
import Products from "../models/Prodcuts";
import { handleControllerError } from "../utils/handleControllerError";

class ProductsController {
  public static createProduct = async (req: CreateProductResquestDto, res: Response) => {
    const { name, description, price } = req.body;

    try {
      const newProduct = await Products.create({
        name,
        description,
        price,
      });

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
    const { id } = req.params;

    try {
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
    const { id } = req.params;

    try {
      const deletedCount = await Products.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new NotFoundError(`Product with id ${id} not found`);
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error: unknown) {
      return handleControllerError(error, res);
    }
  };

  public static updateProductById = async (req: UpdateProductResquestDto, res: Response) => {
    const { id } = req.params;

    // Not null updatable data props:
    const updateData = Object.fromEntries(Object.entries(req.body).filter(([, value]) => value !== undefined));

    try {
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
