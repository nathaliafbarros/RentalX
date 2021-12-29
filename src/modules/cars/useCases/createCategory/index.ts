import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

// Transformando isso tudo numa função para que ...?
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
