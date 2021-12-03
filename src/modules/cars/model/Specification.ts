import { v4 as uuidV4 } from 'uuid';

class Specification {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    // Vou criar esse construtor para que se evite criar um id novo ao querer fazer uma edição por exemplo.
    // Então sempre que essa classe for instanciada, vai ocorrer essa verificação para saber se o
    // id já existe ou não.
    // Então a responsabilidade de criar um atributo id estará aqui agora nesse construtor
    constructor() {
        if (!this.id) {
            // Ou seja, se o id não existe, será criado um novo id
            this.id = uuidV4();
        }
    }
}

export { Specification };
