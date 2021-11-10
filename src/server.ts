import express, { request, response } from 'express';

// Importando as rotas
import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());

// Colocando as rotas dentro do USE
app.use(categoriesRoutes);

app.listen(3333, () => console.log('Server is running'));
