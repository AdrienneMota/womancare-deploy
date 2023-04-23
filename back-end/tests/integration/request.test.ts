import app, { init } from "../../src/index";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import httpStatus from "http-status";
import { prisma } from "../../src/database";
import { createDonatory, createGiver, createProduct, createProductRequest, createRequest } from "../factories";


describe('REQUEST', () => {
  beforeAll(async () => {
    await init();
    await cleanDb();
  });
  
  afterAll(async () => { await cleanDb(); })
  
  const server = supertest(app);

  describe("GET /requests", () => {
    let response;
    describe('when it works', () => {
      let donatary;
      let request;
  
      beforeAll(async () => {
        const giver = await createGiver();
        donatary = await createDonatory();
        const product = await createProduct();
        request = await createRequest({ donatory_id: donatary.id, giver_id: giver.id });
        await createProductRequest({ product_id: product.id, request_id: request.id });
  
        response = await server.get('/requests');
        response.text = JSON.parse(response.text)
      })
  
      it('should status to be ok', () => expect(response.status).toBe(httpStatus.OK))
      it('should text to have 1 data', () => expect(response.text.length).toEqual(1))
      it('should text to contain correct value', () => expect(response.text[0]).toMatchObject({ id: request.id, total: request.total, giver_id: request.giver_id, donatory: { user_name: donatary.user_name } }))
    })
  });
  
  describe("GET /requests/:requestId", () => {
    let response;
    describe('when it works', () => {
      let donatary;
      let request;
  
      beforeAll(async () => {
        const giver = await createGiver();
        donatary = await createDonatory();
        const product = await createProduct();
        request = await createRequest({ donatory_id: donatary.id, giver_id: giver.id });
        await createProductRequest({ product_id: product.id, request_id: request.id });
  
        response = await server.get(`/requests/${request.id}`);
        response.text = JSON.parse(response.text)
      })
  
      it('should status to be ok', () => expect(response.status).toBe(httpStatus.OK))
      it('should text to contain correct value', () => expect(response.text).toMatchObject({ id: request.id, total: request.total, giver_id: request.giver_id, donatory: { user_name: donatary.user_name } }))
    })
  });
  
  describe("PATCH /request/payment/:requestId", () => {
    let response;
    describe('when it works', () => {
      let response;
      let giver;
      let requestBeforePayment;
      let requestAfterPayment;
  
      beforeAll(async () => {
        const donatary = await createDonatory();
        const product = await createProduct();
        requestBeforePayment = await createRequest({ donatory_id: donatary.id });
        await createProductRequest({ product_id: product.id, request_id: requestBeforePayment.id });
  
        giver = await createGiver();
        const token = await generateValidToken(giver);
  
        response = await server.patch(`/request/payment/${requestBeforePayment.id}`).set('Authorization', `Bearer ${token}`);
  
        requestAfterPayment = await prisma.request.findUnique({ where: { id: requestBeforePayment.id } })
      })
  
      it('should status to be not content', () => expect(response.status).toBe(httpStatus.NO_CONTENT))
      it('should request before payment have correct giver id', () => expect(requestBeforePayment).toHaveProperty('giver_id', null))
      it('should request after payment have correct giver id', () => expect(requestAfterPayment).toHaveProperty('giver_id', giver.id))
    })
  });
})
