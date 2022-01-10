import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
    // criando o repositório/array fake
    // private specifications: Specification[];

    private repository: Repository<Specification>;

    // Vou criar esse construtor para inicializar o atributo acima
    // Então sempre que essa classe for instanciada, é que o atributo/variável será inicializado
    // Então a responsabilidade de criar o array fake e inicializar esse atributo estará aqui agora.
    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.findOne({ name });
        return specification;
    }
}

export { SpecificationsRepository };
