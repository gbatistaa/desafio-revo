// src/validations/product.validation.ts
import { z } from "zod";

// Schema for validating the request params
export const paramsSchema = z.object({
  id: z.uuid("Id must be a valid UUIDv4"),
});

// Schema for creating a product:
export const createProductSchema = z.object({
  name: z.string("Name is required").min(3, "Name must be at least 3 characters long"),
  description: z.string("Description is required"),
  price: z.number("Price is required").positive("Price must be a positive number"),
});

// Schema for updating a product (all fields are optional)
export const updateProductSchema = createProductSchema.partial();
