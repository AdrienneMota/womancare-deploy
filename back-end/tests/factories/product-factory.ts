import { faker } from "@faker-js/faker";
import { product as Product } from "@prisma/client";
import { prisma } from "../../src/database";

export async function createProduct(params: Partial<Product> = {}): Promise<Product> {
  return prisma.product.create({
    data: {
      title: params.title || faker.datatype.string(),
      description: params.description || faker.datatype.string(100),
      unit_price: params.unit_price || faker.datatype.number(),
      image: params.image || faker.datatype.string(),
    },
  });
}
