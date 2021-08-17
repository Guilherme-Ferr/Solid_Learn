import { User } from "../entities/User";

export interface IUsersRepository {
  //recebe email e retorna usuario
  findByEmail(email: string): Promise<User>;

  //recebe usuario e salva no banco
  save(user: User): Promise<void>;
}
