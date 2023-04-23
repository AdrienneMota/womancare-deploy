import app, { init } from "../../src/index";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { createGiver } from "../factories";
import userUnauthorizedError from "../../src/errors/user.unauthorized.error";
import { prisma } from "../../src/database";
import * as jwt from 'jsonwebtoken'

describe('AUTHENTICATION', () => {

  beforeAll(async () => {
    await init();
    await cleanDb();
  });
  
  afterAll(async () => { await cleanDb(); })
  
  const server = supertest(app);

  describe("POST /signin", () => {
    let response;
    const userGiver = {
      email: faker.internet.email(),
      password: faker.internet.password(10),
      // name: faker.name.firstName(),
      user_name: faker.name.firstName().toLocaleLowerCase()
    }
  
    describe('when it works', () => {
      beforeAll(async () => {
        await createGiver(userGiver)
        response = await server.post("/signin").send({ email: userGiver.email, password: userGiver.password });
        response.text = JSON.parse(response.text)
      })
  
      it('should returns OK status', () => expect(response.status).toBe(httpStatus.OK))
      it('should contains correct user_name', () => expect(response.text).toEqual(expect.objectContaining({ user_name: userGiver.user_name })))
    })
  
    describe('when it throws an error', () => {
      describe('when user giver email is null', () => {
        beforeAll(async () => {
          await createGiver(userGiver)
          response = await server.post("/signin").send({ email: faker.internet.email(), password: userGiver.password });
          response.text = JSON.parse(response.text)
        })
  
        it('should status be unauthorized', () => expect(response.status).toBe(httpStatus.UNAUTHORIZED))
        it('should response unauthorized message', () => expect(response.text).toStrictEqual(userUnauthorizedError()))
  
      })
      describe('when user giver password is not the same', () => {
        beforeAll(async () => {
          await createGiver(userGiver)
          response = await server.post("/signin").send({ email: userGiver.email, password: faker.datatype.string(100) });
          response.text = JSON.parse(response.text)
        })
  
        it('should status be unauthorized', () => expect(response.status).toBe(httpStatus.UNAUTHORIZED))
        it('should response unauthorized message', () => expect(response.text).toStrictEqual(userUnauthorizedError()))
      })
      describe('when email is invalid', () => {
        beforeAll(async () => {
          response = await server.post("/signin").send({ email: faker.name.firstName(), password: faker.datatype.string(100) });
          response.text = JSON.parse(response.text)
        })
  
        it('should status be Unprocessed Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should response Unprocessed Entity message', () => expect(response.text).toStrictEqual({ "message": "error: \"email\" must be a valid email", "name": "schemaError", }))
      })
      describe('when password is invalid', () => {
        beforeAll(async () => {
          response = await server.post("/signin").send({ email: faker.internet.email(), password: faker.datatype.number() });
          response.text = JSON.parse(response.text)
        })
  
        it('should status be Unprocessed Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should response Unprocessed Entity message', () => expect(response.text).toStrictEqual({ "message": "error: \"password\" must be a string", "name": "schemaError", }))
      })
      describe('when email and password is not sended', () => {
        beforeAll(async () => {
          response = await server.post("/signin").send({});
          response.text = JSON.parse(response.text)
        })
  
        it('should status be Unprocessed Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should response Unprocessed Entity message', () => expect(response.text).toStrictEqual({ "message": "error: \"email\" is required,\"password\" is required", "name": "schemaError", }))
      })
      describe('when password is not sended', () => {
        beforeAll(async () => {
          response = await server.post("/signin").send({ email: faker.internet.email() });
          response.text = JSON.parse(response.text)
        })
  
        it('should status be Unprocessed Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should response Unprocessed Entity message', () => expect(response.text).toStrictEqual({ "message": "error: \"password\" is required", "name": "schemaError", }))
      })
    })
  });
  describe("DELETE /signout", () => {
    let response;
    const userGiver = {
      email: faker.internet.email(),
      password: faker.internet.password(10),
      name: faker.name.firstName(),
      user_name: faker.internet.userName()
    }
  
    describe('when it works', () => {
      let sessionBeforeSignout;
      let sessionAfterSignout;
  
      beforeAll(async () => {
        const giver = await createGiver(userGiver)
        const token = await generateValidToken(giver)
        sessionBeforeSignout = await prisma.session.findFirst({ where: { token } })
        response = await server.delete("/signout").set('Authorization', `Bearer ${token}`);
        sessionAfterSignout = await prisma.session.findFirst({ where: { token } });
      })
  
      it('should returns OK status', () => expect(response.status).toBe(httpStatus.NO_CONTENT))
      it('should session before signout not to be null', () => expect(sessionBeforeSignout).not.toBe(null))
      it('should session ater signout to be null', () => expect(sessionAfterSignout).toBe(null))
      it('should different betwen session before and after signout', () => expect(sessionBeforeSignout).not.toEqual(sessionAfterSignout))
    })
  
    describe('when it throws an error', () => {
      describe('when does not send authorization', () => {
        beforeAll(async () => {
          response = await server.delete("/signout");
        })
  
        it('should status be unauthorized', () => expect(response.status).toBe(httpStatus.UNAUTHORIZED))
      })
      describe('when does not send token', () => {
        beforeAll(async () => {
          response = await server.delete("/signout").set('Authorization', 'Bearer');
        })
  
        it('should status be unauthorized', () => expect(response.status).toBe(httpStatus.UNAUTHORIZED))
      })
      describe('when user has no session', () => {
        beforeAll(async () => {
          const token = jwt.sign({ userId: 12 }, process.env.JWT_SECRET);
          response = await server.delete("/signout").set('Authorization', `Bearer ${token}`);
        })
  
        it('should status be unauthorized', () => expect(response.status).toBe(httpStatus.UNAUTHORIZED))
      })
    })
  });

})
