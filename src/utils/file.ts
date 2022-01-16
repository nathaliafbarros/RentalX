import fs from 'fs';

export const deleteFile = async (filename: string) => {
    // o stat verifica se o arquivo existe ou não no diretorio
    try {
        // Se não existir, vai pro catch e dá erro
        await fs.promises.stat(filename);
    } catch {
        return;
    }

    // Se existir, o unlink vai remover esse arquivo
    await fs.promises.unlink(filename);
};
