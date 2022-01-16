import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    // Recebendo o token. O JWT funciona através do Bearer Token
    // Padrão JWT: Bearer uhrqoirhpafhopaifhioaeh. Essas informações virão dentro header, então é de lá que
    // pegaremos a informação do token a ser recebido
    const authHeader = request.headers.authorization;

    // verificando se o veio mesmo a informação do header, ou seja, se veio mesmo o token
    if (!authHeader) {
        throw new AppError('Token missing', 401);
    }

    // Então se o token existe, ele vai seguir por aqui e então precisaremos desestruturar esse token.
    // Pois ele vai vir nesse formato: Bearer uhrqoirhpafhopaifhioaeh
    const [, token] = authHeader.split(' ');
    // Então esse split vai dividir pelo espaço. Então ele vai criar um array com duas posições [Bearer, uhrqoirhpafhopaifhioaeh]
    // Então dessa forma podemos desconsiderar a posição 0 com a palavra Bearer e pegamos somente a posição 1 com o token
    // Então a posição 1 fica sendo chamado como "token"

    // Agora com o token em mãos, precisamos verificar se esse token é válido
    // Primeiro parâmetro o token, e segundo parâmetro a palavra chave
    // Se der sucesso, ele continua a rodar. Senão der sucesso ele lança uma exceção. Então vamos usar try/catch
    try {
        // Mas eu quero somente o sub
        // E no caso abaixo estou chamando esse sub de id(alias)
        const { sub: user_id } = verify(
            token,
            '004095b76cc9d207b99fe76873ed28fd',
        ) as IPayload;
        // pegando só o sub que é o id do user. Mas o "verify" não reconhece de cara, então forçamos usando
        // uma interface para retornar a interface com o sub como string

        // Agora vamos verificar se o user existe no BD. E para isso, precisamos chamar o repositório
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exists', 401);
        }

        // Aqui o erro tá dizendo que não existe a propriedade "user" dentro do request
        // Então precisamos colocar essa informação dentro request
        // Para resolver isso precisamos sobrescrever a biblioteca do express @types
        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
    // Para testar, pega o token lá criado na session e passa pela rota desejada pelo Auth/Bearer
    // Retorna pelo console.log:
    // {
    //    iat: 1641951543,
    //    exp: 1642037943,
    //    sub: 'c646f23e-5fb9-4bf5-b96d-60be7ff4b08c'
    //  }
}
