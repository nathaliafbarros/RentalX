import { Request } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

// Tirei isso tudo de dentro da rota e passei para cá
class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

    handle(request: Request, response: Response): Response {
        const all = this.listCategoriesUseCase.execute();

        return response.json(all);
    }
}

export { ListCategoriesController };
