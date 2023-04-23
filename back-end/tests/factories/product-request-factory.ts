import { faker } from "@faker-js/faker";
import { product_request as ProductRequest } from "@prisma/client";
import { prisma } from "../../src/database";
import { createProduct } from "./product-factory";
import { createRequest } from "./request-factory";

export async function createProductRequest(params: Partial<ProductRequest> = {}): Promise<ProductRequest> {
  const request_id = params.request_id || (await createRequest()).id;
  const product_id = params.product_id || (await createProduct()).id;

  return prisma.product_request.create({
    data: {
      product_id,
      request_id,
      quantity: params.quantity || faker.datatype.number(),
      unit_price: params.quantity || faker.datatype.number()
    },
  });
}
