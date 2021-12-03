import { Category } from '../../model/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    // criando o repositório/array fake
    private categories: Category[]; // const categories: Category[] = [];  O "const" só faria sentido dentro de um método, e não como atributo. Aqui é preciso definir seu nível de acesso.

    // Usando o padrão de projeto singleton
    // Criando um atributo/variável para a Instância global
    private static INSTANCE: CategoriesRepository;
    // Vou criar esse construtor para inicializar o atributo/variável categories.
    // Tornar o construtor como private, faz com que ele só possa ser acessado aqui dentro dessa classe
    private constructor() {
        this.categories = [];
    }
    public static getInstance(): CategoriesRepository {
        // Se a instância não existir, ela será criada/instanciada
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        // Se a instância já existir, ela mesma será retornada
        return CategoriesRepository.INSTANCE;
    }

    // Vou criar esse construtor para inicializar o atributo categories
    // Então sempre que essa classe for instanciada, é que o atributo/variável será inicializado
    // Então a responsabilidade de criar o array fake e inicializar esse atributo categories estará aqui agora nesse construtor
    /* constructor() {
        this.categories = [];
    }
    */

    // Método responsável por cadastrar a categoria na nossa "tabela/array" Category
    create({ name, description }: ICreateCategoryDTO): void {
        // Para trazer os valores/atributos da nossa rota/request.body usamos o conceito DTO, para transferir dados entre classes/camadas
        // O tipo de retorno dessa função será void, ou seja, essa função não terá retorno
        const category = new Category();
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });
        this.categories.push(category);
    }
    list(): Category[] {
        return this.categories;
    }

    // Método para validar se já há outro nome de categoria.
    findByName(name: string): Category {
        const category = this.categories.find(
            category => category.name === name,
        );
        return category;
    }
}

export { CategoriesRepository };
