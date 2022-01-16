import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatar_file: string;
}
// adicionar coluna avatar na tabela de users no banco
// yarn typeorm migration:create -n AlterUserAddAvatar
// yarn typeorm migration:run
// refatorar a entity User com coluna avatar

// criar a regra de negocio do upload

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}
    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        // não preciso verificar se o user existe, pq já temos as rotas autenticadas
        const user = await this.usersRepository.findById(user_id);

        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };
