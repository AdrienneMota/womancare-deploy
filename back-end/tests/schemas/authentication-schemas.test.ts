import authenticationSchema from "./authentication.schema";
import { faker } from "@faker-js/faker";

describe("signInSchema", () => {
  const generateValidInput = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(6),
  });

  describe("when email is not valid", () => {
    it("should return error if email is not present", () => {
      const input = generateValidInput();
      delete input.email;

      const { error } = authenticationSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error when email is not valid", () => {
      const input = generateValidInput();
      input.email = faker.lorem.word();

      const { error } = authenticationSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when password is not valid", () => {
    it("should return error if password is not present", () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = authenticationSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if password is not a string", () => {
      const input = generateValidInput();

      const { error } = authenticationSchema.validate({ ...input, password: faker.datatype.number() });

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = authenticationSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
