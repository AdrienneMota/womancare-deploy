import { faker } from "@faker-js/faker";
import { request as Request } from "@prisma/client";
import { prisma } from "../../src/database";
import { createDonatory } from "./donatory-factory";

export async function createRequest(params: Partial<Request> = {}): Promise<Request> {
  const donatory_id = params.donatory_id || (await createDonatory()).id;

  return prisma.request.create({
    data: {
      donatory_id,
      giver_id: params.giver_id,
      total: params.total || faker.datatype.number()
    },
  });
}
