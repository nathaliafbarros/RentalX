// import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

    handle(request: Request, response: Response): Response {
        const { file } = request; // Passando o mouse aqui em cima, ele me diz o tipo do arquivo: Express.Multer.File
        // Vou colocar lá no UseCase

        if (!file) {
            return response.status(201).send('File not sent');
        }

        this.importCategoryUseCase.execute(file);
        return response.status(201).send();
    }
}

export { ImportCategoryController };
