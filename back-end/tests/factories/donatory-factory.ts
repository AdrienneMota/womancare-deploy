import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { donatory as Donatory } from "@prisma/client";
import { prisma } from "../../src/database";

export async function createDonatory(params: Partial<Donatory> = {}): Promise<Donatory> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.donatory.create({
    data: {
      name: params.name || faker.name.firstName(),
      user_name: (params.user_name || faker.name.firstName()).toLowerCase(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}
