import app, { init } from "../../src/index";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { prisma } from "../../src/database";
import { createGiver } from "../factories";

describe("Users", () => {
  beforeAll(async () => {
    await init();
    await cleanDb();
  });
  
  afterAll(async () => { await cleanDb(); })
  
  const server = supertest(app);
  describe("POST /signup", () => {
    let response;
    let savedUser;
    const userGiver = {
      email: faker.internet.email(),
      password: faker.internet.password(10),
      name: faker.name.firstName(),
      user_name: faker.internet.userName()
    }
    describe('when it works', () => {
      beforeAll(async () => {
        response = await server.post('/signup').send(userGiver);
        savedUser = await prisma.giver.findFirst({ where: { email: userGiver.email } })
      })
  
      it('should status to be created', () => expect(response.status).toBe(httpStatus.CREATED))
      it('should saved user to not be null', () => expect(savedUser).not.toBe(null))
      it('should saved user has the correct info', () => expect(savedUser).toEqual(expect.objectContaining({ ...userGiver, password: expect.any(String) })))
    })
  
    describe('when throws an error', () => {
      describe('when email is duplicated', () => {
        beforeAll(async () => {
          await createGiver(userGiver);
          response = await server.post('/signup').send(userGiver);
        })
  
        it('should status to be conflicted', () => expect(response.status).toBe(httpStatus.CONFLICT))
        it('should returns correct text', () => expect(response.text).toBe('There is already an user with given email'))
      })
      describe('when name is larger then 300', () => {
        beforeAll(async () => {
          response = await server.post('/signup').send({ ...userGiver, name: faker.datatype.string(300) });
          response.text = JSON.parse(response.text)
        })
  
        it('should status to be Unprocessable Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should returns correct text', () => expect(response.text).toEqual({ message: "error: \"name\" length must be less than or equal to 250 characters long", name: "schemaError" }))
      })
      describe('when name number', () => {
        beforeAll(async () => {
          response = await server.post('/signup').send({ ...userGiver, name: faker.datatype.number() });
          response.text = JSON.parse(response.text)
        })
  
        it('should status to be Unprocessable Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should returns correct text', () => expect(response.text).toEqual({ "message": "error: \"name\" must be a string", "name": "schemaError" }))
      })
      describe('when user_name is larger then 300', () => {
        beforeAll(async () => {
          response = await server.post('/signup').send({ ...userGiver, user_name: faker.datatype.string(300) });
          response.text = JSON.parse(response.text)
        })
  
        it('should status to be Unprocessable Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should returns correct text', () => expect(response.text).toEqual({ message: "error: \"user_name\" length must be less than or equal to 100 characters long", name: "schemaError" }))
      })
      describe('when user_name number', () => {
        beforeAll(async () => {
          response = await server.post('/signup').send({ ...userGiver, user_name: faker.datatype.number() });
          response.text = JSON.parse(response.text)
        })
  
        it('should status to be Unprocessable Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should returns correct text', () => expect(response.text).toEqual({ "message": "error: \"user_name\" must be a string", "name": "schemaError" }))
      })
      describe('when email is larger then 300', () => {
        beforeAll(async () => {
          response = await server.post('/signup').send({ ...userGiver, email: faker.datatype.string(300) });
          response.text = JSON.parse(response.text)
        })
  
        it('should status to be Unprocessable Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should returns correct text', () => expect(response.text).toEqual({ message: "error: \"email\" must be a valid email,\"email\" length must be less than or equal to 100 characters long", name: "schemaError" }))
      })
      describe('when email number', () => {
        beforeAll(async () => {
          response = await server.post('/signup').send({ ...userGiver, email: faker.datatype.number() });
          response.text = JSON.parse(response.text)
        })
  
        it('should status to be Unprocessable Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should returns correct text', () => expect(response.text).toEqual({ "message": "error: \"email\" must be a string", "name": "schemaError" }))
      })
      describe('when password is less then 4 char', () => {
        beforeAll(async () => {
          response = await server.post('/signup').send({ ...userGiver, password: faker.datatype.string(3) });
          response.text = JSON.parse(response.text)
        })
  
        it('should status to be Unprocessable Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should returns correct text', () => expect(response.text).toEqual({ message: "error: \"password\" length must be at least 4 characters long", name: "schemaError" }))
      })
      describe('when password number', () => {
        beforeAll(async () => {
          response = await server.post('/signup').send({ ...userGiver, password: faker.datatype.number() });
          response.text = JSON.parse(response.text)
        })
  
        it('should status to be Unprocessable Entity', () => expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY))
        it('should returns correct text', () => expect(response.text).toEqual({ "message": "error: \"password\" must be a string", "name": "schemaError" }))
      })
    })
  });

})

