/* import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

// Transformando isso tudo numa função para que quando a leitura do código chegar aqui no
// "const categoriesRepository = new CategoriesRepository();" e criar a minha instância de repositório
// new CategoriesRepository() e rodar os métodos de lá(constructor() e create({ name, description })
// iria dar erro pois o meu banco de dados ainda não estaria de pé/conectado.
// Então agora ele só vai chamar esses métodos depois da conexão com o banco estiver estabilizada.
export default (): CreateCategoryController => {
    // Por último o Usecase que depende do repositório
    const categoriesRepository = new CategoriesRepository();

    // Depois o Controller que depende do UseCase
    const createCategoryUseCase = new CreateCategoryUseCase(
        categoriesRepository,
    );

    // Primeiro a rota: que depende do Controller
    const createCategoryController = new CreateCategoryController(
        createCategoryUseCase,
    );

    return createCategoryController;
};
 */