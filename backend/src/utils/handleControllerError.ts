import { Response } from "express";
import { BaseError, ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { NotFoundError } from "../errors/NotFoundError";

export function handleControllerError(error: unknown, res: Response) {
  console.error(error);

  if (error instanceof NotFoundError) {
    return res.status(404).json({
      error: "Not Found",
      message: error.message,
    });
  }

  if (error instanceof UniqueConstraintError) {
    return res.status(409).json({
      error: "Database Conflict",
      message: "A record with the same unique field already exists.",
    });
  }

  if (error instanceof ForeignKeyConstraintError) {
    return res.status(409).json({
      error: "Database Conflict",
      message: "Operation failed due to a foreign key constraint violation.",
    });
  }

  if (error instanceof BaseError) {
    return res.status(400).json({
      error: "Database Error",
      message: error.message,
    });
  }

  return res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on the server. Please try again later.",
  });
}
