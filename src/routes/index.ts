import { Router } from 'express';

import { authenticateRoutes } from './authenticate.route';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

// Colocando as rotas dentro do USE
// Passei o /categories para o server, para definir um path base
// Ou seja, todas as rotas do arquivo categoriesRoutes serão acessíveis pela rota base /categories
// app.use('/categories', categoriesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
// aqui abaixo, eu quero somente o /
router.use(authenticateRoutes);

export { router };
