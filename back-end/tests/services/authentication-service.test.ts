import { faker } from "@faker-js/faker";
import { cleanDb } from "../helpers";
import { init } from "../../src/index";
import { prisma } from "../../src/database";
import { createGiver } from "../factories";
import authenticationService from "../../src/services/authentication.service";
import * as jwt from 'jsonwebtoken'
import userUnauthorizedError from "../../src/errors/user.unauthorized.error";

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterEach(async () => {
  await cleanDb();
});

describe("authenticationService", () => {
  const userGiver = {
    email: faker.internet.email(),
    password: faker.internet.password(10),
    name: faker.name.firstName(),
    user_name: faker.name.firstName().toLocaleLowerCase()
  }

  describe('when it works', () => {
    let auth;
    let dbSession;
    let dbUserGiver;

    beforeEach(async () => {
      await createGiver(userGiver)
      auth = await authenticationService.signInPost(userGiver)
      dbSession = await prisma.session.findFirst({ where: { token: auth.token } });
      dbUserGiver = await prisma.giver.findFirst({ where: { email: userGiver.email } })
    })

    it('should user_name be equal', () => expect(auth.user_name).toBe(userGiver.user_name));
    it('should token be valid', () => expect(jwt.verify(auth.token, process.env.JWT_SECRET)).toEqual(expect.objectContaining({ userId: dbUserGiver.id })));
    it('should exists correct session', () => expect(dbSession).toEqual(expect.objectContaining({ giver_id: dbUserGiver.id, token: auth.token })));
  });

  describe('when throws errors', () => {
    describe('when user giver does not exists', () => {
      it('it throws unauthorized error', () => expect(authenticationService.signInPost(userGiver)).rejects.toStrictEqual(userUnauthorizedError()))
    })
    describe('when user password is invalid', () => {
      beforeEach(() => createGiver(userGiver))
      it('it throws unauthorized error', () => expect(authenticationService.signInPost({ ...userGiver, password: 'pass123' })).rejects.toStrictEqual(userUnauthorizedError()))
    })
  })
});
