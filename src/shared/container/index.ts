// importando a função "container" do tsyringe
import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

// registrando um singleton (instância única)
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository', // Definindo um nome para esse container. Geralmente, é o mesmo nome da classe
    CategoriesRepository, // classe que irá ser chamada sempre que esse nome/esse container for chamado
);
