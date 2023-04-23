import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { giver as Giver } from "@prisma/client";
import { prisma } from "../../src/database";

export async function createGiver(params: Partial<Giver> = {}): Promise<Giver> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.giver.create({
    data: {
      name: params.name || faker.name.firstName(),
      user_name: (params.user_name || faker.name.firstName()).toLowerCase(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}
