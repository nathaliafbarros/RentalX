// Tudo começa por aqui com o Tsyringe
// Depois vai para o useCase
// Depois vai para o controller
// importando a função "container" do tsyringe
import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

// registrando um singleton (instância única)
// Então toda vez que tiver uma interface ICategoriesRepository que dentro tem uma injeção apontando
// para o nome 'CategoriesRepository', a classe CategoriesRepository será chamada
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository', // Definindo um nome para esse container. Geralmente, é o mesmo nome da classe
    CategoriesRepository, // classe que irá ser chamada sempre que esse nome/esse container for chamado
);
container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository', // Definindo um nome para esse container. Geralmente, é o mesmo nome da classe
    SpecificationsRepository, // classe que irá ser chamada sempre que esse nome/esse container for chamado
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);
