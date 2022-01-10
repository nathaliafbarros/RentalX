import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request; // Passando o mouse aqui em cima, ele me diz o tipo do arquivo: Express.Multer.File
        // Vou colocar lá no UseCase

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

        if (!file) {
            return response.status(201).send('File not sent');
        }

        await importCategoryUseCase.execute(file);
        return response.status(201).send();
    }
}

export { ImportCategoryController };
