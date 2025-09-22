import { Request } from "express";

export interface UpdateProductResquestDto extends Request {
  body: {
    name?: string;
    description?: string;
    price?: number;
  };
}
