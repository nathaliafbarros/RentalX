export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    // Não defini o statusCode como number pq ele ficará com um padrão para quando não vir nenhum erro.
    // Então o erro padrão se não receber nenhum erro, será o erro 400
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
