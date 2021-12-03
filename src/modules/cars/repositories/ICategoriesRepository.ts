import { Category } from '../model/Category';

// DTO - Para trazer os valores/atributos da nossa rota/request.body usamos o conceito DTO, para transferir dados entre classes/camadas
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
