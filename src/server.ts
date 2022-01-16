import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
// importando o swagger
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
// importando o arquivo swagger.json
import swaggerFile from './swagger.json';

// importando o arquivo index.ts do database
import './database';

import './shared/container';
import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());

// passando uma url/rota para onde vai ficar nossa documentação. Chamando o servidor. Passando um arquivo de
// setup que é swagger.json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

// middleware para passar o erros adiante
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        // verificando qual a instância do erro, ou seja, se esse erro é do tipo AppError por exemplo
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ message: err.message });
        }
        // Se ele não for do tipo AppError, vai continuar aqui
        return response.status(500).json({
            status: 'error',
            message: `Internal server error - ${err.message}`,
        });
    },
);

app.listen(3333, () => console.log('Server is running'));
