import 'reflect-metadata';

import express from 'express';
// importando o swagger
import swaggerUi from 'swagger-ui-express';

import { router } from './routes';
// importando o arquivo swagger.json
import swaggerFile from './swagger.json';

// importando o arquivo index.ts do database
import './database';

import './shared/container';

const app = express();

app.use(express.json());

// passando uma url/rota para onde vai ficar nossa documentação. Chamando o servidor. Passando um arquivo de
// setup que é swagger.json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log('Server is running'));
