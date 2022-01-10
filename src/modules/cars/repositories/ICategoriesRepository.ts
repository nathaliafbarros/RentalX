import { Category } from '../entities/Category';

// DTO - Para trazer os valores/atributos da recebidos na nossa rota/request.body usamos o conceito DTO, para transferir dados entre classes/camadas
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
