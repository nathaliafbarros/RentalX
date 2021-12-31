// Meu antigo Service CreateCategoryService.ts

import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

// DTO - Para trazer os valores/atributos da nossa rota/request.body usamos o conceito DTO, para transferir dados entre classes/camadas
interface IRequest {
    name: string;
    description: string;
}

/**
 * [x] - Inserir o DTO
 * [x] - Definir o tipo de retono: void
 * [x] - Alterar o retorno de erro: Mudar para throw new Error()
 * [x] - Acessar o repositório: Usamps o DIP para criar/acessar o array categories = []
 */
@injectable()
class CreateCategoryUseCase {
    // Passando para cá a responsabilidade de acessar o repositório, puxando a classe CategoriesRepository.
    // Do jeito que o código está, esse service está diretamente dependente da classe CategoriesRepository.
    // Dessa maneira, se eu quiser mudar o repositório/banco para um Postgres(no momento, o banco está na memória) não será simples de mudar.
    // Por isso, vou criar uma interface que será implementada pela classe.
    // Então ao invés de implementar a classe concreta CategoriesRepository, terei uma inteface.
    // Então qualquer classe(PostgresCategoriesRepository ou MySQLCategoriesRepository) que implementar essa interface, vai funcionar.
    /* private categoriesRepository: CategoriesRepository;
        constructor(categoriesRepository: CategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    */
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository,
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        // Para trazer os valores/atributos da nossa rota/request.body usamos o conceito DTO, para transferir dados entre classes/camadas

        /* Inverti usando o DIP - Dependency Inversion Principle. Ao invés do service ter que acessar o repositório criando um array, essa responsabilidade será agora de quem chamar o service, que é o route
        // Acessando o repositório.
        // Instanciando a classe, o atributo/variável será inicializado, ou seja, o array categories = [] será criado.
        const categoriesRepository = new CategoriesRepository();
        */
        // Testando se já existe o mesmo nome de categoria. Se não existir, a categoria será criada.
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);
        if (categoryAlreadyExists) {
            throw new Error('Category already exists');
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
