// Importando a csv-parse
import { parse as csvParse } from 'csv-parse';
// importando um módulo nativo do node que é o "fs" file system
import fs from 'fs';

class ImportCategoryUseCase {
    execute(file: Express.Multer.File): void {
        // acessando o fs para usar o conceito de stream para ler o arquivo por partes
        const stream = fs.createReadStream(file.path);

        // instanciando o csv-parse
        const parseFile = csvParse();

        // usando a função pipe - o pipe pega os pedaços do que está sendo lido e repassa para o local determinado
        stream.pipe(parseFile);

        // Recebendo os dados das linhas lidas
        parseFile.on('data', async line => {
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase };
