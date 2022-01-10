/* import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

// Por último o Usecase que depende do repositório
const categoriesRepository = null;

// Depois o Controller que depende do UseCase
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

// Primeiro a rota: que depende do Controller
const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
);

export { listCategoriesController };
 */