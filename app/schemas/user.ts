import { err, ok, type Err } from "true-myth/result";
import type Result from "true-myth/result";
import { ValidationError, object, string, type InferType } from "yup";

const user = object({
  id: string().optional(),
  email: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  phone: string().required(),
  role: string().required()
});


export default class User implements InferType<typeof user> {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;

  private constructor(data: InferType<typeof user>) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.role = data.role;
  }

  static async from(data: unknown): Promise<Result<User, ValidationError>> {
    try {
      const validated = await user.validate(data);
      return ok(new User(validated));
    } catch (e) {
      if (e instanceof ValidationError) {
        return err(e);
      }
      throw e;
    }
  }
}
