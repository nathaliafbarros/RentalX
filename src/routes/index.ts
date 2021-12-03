import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

// Colocando as rotas dentro do USE
// Passei o /categories para o server, para definir um path base
// Ou seja, todas as rotas do arquivo categoriesRoutes serão acessíveis pela rota base /categories
// app.use('/categories', categoriesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

export { router };
