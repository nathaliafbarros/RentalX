import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    // criando o repositório/array fake
    // private categories: Category[]; // const categories: Category[] = [];  O "const" só faria sentido dentro de um método, e não como atributo. Aqui é preciso definir seu nível de acesso.

    private repository: Repository<Category>;
    // Defini como private essa variável/atributo, assim eu só consigo acessar ela aqui dentro dessa classe

    // Usando o padrão de projeto singleton
    // Criando um atributo/variável para uma Instância global
    // private static INSTANCE: CategoriesRepository;

    // Vou criar esse construtor para inicializar o atributo/variável repository.
    constructor() {
        this.repository = getRepository(Category);
    }

    /*
    public static getInstance(): CategoriesRepository {
        // Se a instância não existir, ela será criada/instanciada
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        // Se a instância já existir, ela mesma será retornada
        return CategoriesRepository.INSTANCE;
    }
    */

    // Método responsável por cadastrar a categoria na nossa "tabela/array" Category
    // Esse método é assíncrono, ou seja, ele vai esperar que a linha do save(42) aconteça para só
    // depois concluir esse método/função
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        // Criando a entidade para que possa ser salvo os dados
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    // Método para validar se já há outro nome de categoria.
    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
