import { Specification } from '../../entities/Specification';
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    // criando o repositório/array fake
    private specifications: Specification[];

    // Vou criar esse construtor para inicializar o atributo acima
    // Então sempre que essa classe for instanciada, é que o atributo/variável será inicializado
    // Então a responsabilidade de criar o array fake e inicializar esse atributo estará aqui agora.
    constructor() {
        this.specifications = [];
    }

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        // Esse Object.assign pega os dados com os devidos valores que veio do usuário(new Specification) e joga dentro de specification.
        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });
        this.specifications.push(specification);
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(
            specification => specification.name === name,
        );
        return specification;
    }
}

export { SpecificationsRepository };
