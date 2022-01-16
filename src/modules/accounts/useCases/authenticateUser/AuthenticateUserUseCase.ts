import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

// minha interface de retorno, para determinar oq exatamente vai retornar.
// então conforme a interface, só irá ser retornado somente o name e email, e não outros atributos sensíveis, como senha
interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    // Para saber se o user existe, vou precisar do meu repositorio UsersRepository
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Verificar se user existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or password incorrect');
            // Dessa forma eu não especifico se é o email ou a senha que está incorreta
            // assum eu não facilito a tentativa de users mal intencionados
        }
        // Se o user existe, vai vir para cá e verificar se a senha está correta.
        // O compare vai pegar a senha que o user está passando e comparar com a senha do banco
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect');
        }

        // Se a senha está correta e o user tb correto, é preciso gerar o jsonwebtoken
        // o primeiro parâmetro é o Payload(nome, permissões)
        // o segundo parâmetro é uma palavra-chave
        // eu poderia criar como chave um grupo aleatório de caracteres criado na mão
        // ou pegar um gerado por qualquer gerador MD5 / MD5 Hash Generator
        // o terceiro parâmetro é um objeto que recebe um subject que sempre será o id do user que
        // está recebendo esse token
        const token = sign({}, '004095b76cc9d207b99fe76873ed28fd', {
            subject: user.id,
            expiresIn: '1d',
        });

        // retornando o token para o user
        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
