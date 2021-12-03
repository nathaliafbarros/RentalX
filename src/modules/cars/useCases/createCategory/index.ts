import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

// Por último o Usecase que depende do repositório
const categoriesRepository = CategoriesRepository.getInstance();

// Depois o Controller que depende do UseCase
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

// Primeiro a rota: que depende do Controller
const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
);

export { createCategoryController, createCategoryUseCase };
