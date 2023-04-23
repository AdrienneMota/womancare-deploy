import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { cleanDb } from "../helpers";
import { init } from "../../src/index";
import userGiverService from "../../src/services/user.giver.service";
import { prisma } from "../../src/database";
import { duplicatedEmailError } from "../../src/errors/duplicate.email.error";

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterEach(async () => {
  await cleanDb();
});

describe("createGiverUser", () => {
  const userGiver = {
    email: faker.internet.email(),
    password: faker.internet.password(10),
    name: faker.name.firstName(),
    user_name: faker.name.firstName().toLocaleLowerCase()
  }

  describe('when it works', () => {
    let dbUser;

    beforeEach(async () => {
      const user = await userGiverService.createUserGiver(userGiver)
      dbUser = await prisma.giver.findUnique({ where: { id: user.id } })
    })

    it('should name be equal', () => expect(userGiver.name).toBe(dbUser.name));
    it('should user_name be equal', () => expect(userGiver.user_name).toBe(dbUser.user_name));
    it('should email be equal', () => expect(userGiver.email).toBe(dbUser.email));
    it('password should be different from stored', () => expect(userGiver.password).not.toBe(dbUser.password));
    it('should compare be equal', () => expect(bcrypt.compare(userGiver.password, dbUser.password)).resolves.toBeTruthy());
  });

  describe('when throws errors', () => {
    describe('when giver email is duplicated', () => {
      beforeEach(async () => {
        await userGiverService.createUserGiver(userGiver)
      })

      it('it throws duplicated error', () => expect(userGiverService.createUserGiver(userGiver)).rejects.toStrictEqual(duplicatedEmailError()))
    })
  })
});
