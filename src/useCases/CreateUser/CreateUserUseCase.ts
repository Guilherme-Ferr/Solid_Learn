import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  //Recebe e retorna dados
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.name);

    if (userAlreadyExists) {
      throw new Error("User already exisits.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe do meu app",
        email: "equipe@meuapp.com",
      },
      subject: "Seja bem-vindo á plataforma",
      body: "<p>Você já pode fazer login em nossa plataforma</p>",
    });
  }
}
