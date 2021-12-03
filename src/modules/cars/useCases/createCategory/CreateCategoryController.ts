import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

// Tirei isso tudo de dentro da rota e passei para cá
class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        this.createCategoryUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController };
