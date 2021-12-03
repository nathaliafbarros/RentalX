import { request, response, Router } from 'express';
// import { v4 as uuidV4 } from 'uuid'; // { v4 } sobrescrevi o nome para uuidV4.

// import { PostgresCategoriesRepository } from '../modules/cars/repositories/PostgresCategoriesRepository';

// Importando o Multer
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';

// Instanciando o Router, para ter acesso às suas funções
const categoriesRoutes = Router({
    dest: './tmp',
});

// Instanciando o Multer, para ter acesso às suas funções e tbm passando algumas configurações
const upload = multer();
// Pegando o arquivo e salvando dentro de uma pasta temporária(dest: './tmp') para fazer a leitura dos dados e depois é
// a deleção dessa pasta temporária.

// const categoriesRepository = new PostgresCategoriesRepository();
// const categoriesRepository = new CategoriesRepository();
// Qualquer das duas Classes/implementações vai funcionar

// Passei essa responsabilidade para repositorie
// const categories: Category[] = []; // const categories = []; chamando a classe e com isso definindo que o modelo dessa classe que será seguido.
// Da forma que o código está, as rotas estão "cadastrando dados no banco", e isso não é indicado.
// As rotas não devem interagir/ter acesso com o banco de dados
// Essa responsabilidade é do Repositório: é uma camada/classe que é responsável pela manipulação de dados da aplicação.
// A rota chama o repositório, e o repositório é que fará a manipulação dos dados com o banco.

// Passei o /categories para o server, para definir um path base
categoriesRoutes.post('/', (request, response) => {
    // A UNICA RESPONSABILIDADE DA ROTA É RECEBER O REQUEST E REPASSAR
    // Não é pra ficar chamando o service.
    // Tudo isso, vai ficar dentro de Controllers
    // Foi pra Controller:
    // const { name, description } = request.body;
    /* Passei essa responsabilidade para o services
    const categoryAlreadyExists = categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
        return response.status(400).json({ error: 'Category already exists' });
    }

    categoriesRepository.create({ name, description });
    */
    /* Isso tudo aqui é pra acessar o "banco", então será de responsabilidade do repositório.
    const category = new Category(); // Instanciei a classe Category, para que seja chamado o construtor,
    // já que o construtor sempre é chamado quando a classe for instanciada.
    // Assim eu consigo trazer de volta o atributo id para meu objeto.

    // Atribuindo as variáveis que estou recebendo do usuário/request.body.
    // Poderia ser assim: category.name = name;
    // Mas vamos fazer assim, utilizando essa função "Object.assign()". Ficou assim:
    Object.assign(category, {
        name,
        description,
        created_at: new Date(),
    });
    */
    /*
     Estava assim:
        // const category: Category = {
        // Aqui ele estaria reclamando que o atributo id não está aqui conforme
        // está no modelo que deve ser seguido pela classe Category. Para resolver isso, vou dizer
        // lá na classe que esse atributo é opcional.
        // Essa const também seguirá o modelo da classe Category.
        name,
        description,
        // id: uuidV4(), Passei a responsabilidade de criar um id para dentro da classe com o construtor.
        // Mas como passei para classe, preciso trazer ele de volta para meu objeto, chamando o construtor
        created_at: new Date(),
        }; 
    categories.push(category);
    */
    // Chamando o service para verificar se já existe esse mesmo nome de categoria e por fim executar o service e criar a categoria
    // Foi pra Controller:
    /*
    const createCategoryService = new CreateCategoryService(
        categoriesRepository,
    );
    createCategoryService.execute({ name, description });

    return response.status(201).send();
    */
    // Receber o Controller
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});
// upload.single pq é upload de apenas um arquivo e ('file') é o nome que será dado ao arquivo

export { categoriesRoutes };
