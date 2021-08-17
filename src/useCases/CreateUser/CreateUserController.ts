import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserUseController {
  constructor(private createUSerUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      await this.createUSerUseCase.execute({
        name,
        email,
        password,
      });
      return response.status(201).send();
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message || "Unexpected error." });
    }
  }
}
