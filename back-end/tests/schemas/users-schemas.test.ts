import { faker } from "@faker-js/faker";
import userSchema from "./user.schema"

describe("crate user schema", () => {
  const generateValidInput = () => ({
    name: faker.name.findName(),
    user_name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
  });

  describe("when name is null", () => {
    it("should return name is not present", () => {
      const input = generateValidInput();
      delete input.name;

      const { error } = userSchema.validate(input);

      expect(error).toBeDefined();
    });

  });

  describe("when user_name is null", () => {
    it("should return name is not present", () => {
      const input = generateValidInput();
      delete input.user_name;

      const { error } = userSchema.validate(input);

      expect(error).toBeDefined();
    });

  });

  describe("when email is not valid", () => {
    it("should return error if email is not present", () => {
      const input = generateValidInput();
      delete input.email;

      const { error } = userSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if email does not follow valid email format", () => {
      const input = generateValidInput();
      input.email = faker.lorem.word();

      const { error } = userSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when password is not valid", () => {
    it("should return error if password is not present", () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = userSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if password is shorter than 6 characters", () => {
      const input = generateValidInput();
      input.password = faker.lorem.word(3);

      const { error } = userSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when confirmPassword is not valid", () => {
    it("should return error if confirmPassword is not valid", () => {
      const input = generateValidInput();
      const inputWithConfirmPassWord = {...input, confirmPassword: faker.lorem.word(4)}
      const { error } = userSchema.validate(inputWithConfirmPassWord);

      expect(error).toBeDefined();
    });

  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = userSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
