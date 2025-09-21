import { Request } from "express";

export interface CreateProductResquestDto extends Request {
  body: {
    name: string;
    description: string;
    price: number;
  };
}
