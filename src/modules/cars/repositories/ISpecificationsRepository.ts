import { Specification } from '../entities/Specification';

// DTO - Para trazer os valores/atributos da nossa rota/request.body usamos o conceito DTO, para transferir dados entre classes/camadas
interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): void;
    findByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
