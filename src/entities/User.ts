import { uuid } from "uuidv4";

export class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public password: string;

  //Criar nova entidade, omitir o id caso ele exista
  constructor(props: Omit<User, "id">, id?: string) {
    //this recebe todos os props
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
