import { Router } from "express";
import ProductsController from "../controllers/products.controller";

const router = Router();

// Get all products:
router.get("/", ProductsController.getAllProducts);

// Get product by id:
router.get("/:id", ProductsController.getProductById);

// Create new product:
router.post("/", ProductsController.createProduct);

// Update a product data:
router.put("/:id", ProductsController.updateProductById);

// Delete a product:
router.delete("/:id", ProductsController.deleteProductById);

export default router;
