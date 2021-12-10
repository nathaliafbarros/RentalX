// Importando a csv-parse
import { parse as csvParse } from 'csv-parse';
// importando um módulo nativo do node que é o "fs" file system
import fs from 'fs';
import { ICategoriesRepository } from 'modules/cars/repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        // o return será uma Promisse
        return new Promise((resolve, reject) => {
            // acessando o fs para usar o conceito de stream para ler o arquivo por partes
            const stream = fs.createReadStream(file.path);

            // Array para receber os dados lidos do arquivo csv
            const categories: IImportCategory[] = [];

            // instanciando o csv-parse
            const parseFile = csvParse();

            // usando a função pipe do stream/fs - o pipe pega os pedaços do que está sendo lido e repassa para o local determinado
            stream.pipe(parseFile);
            // (stream/fs JUNTO com o parseFile)

            // Recebendo os dados das linhas lidas com o parseFile do csv-parse
            parseFile
                .on('data', async line => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on('end', () => {
                    // unlink remove o arquivo. Passando o arquivo (file) e o diretório dele (path)
                    fs.promises.unlink(file.path);
                    // Função callback
                    // Quando finalizar o parse/leitura desse arquivo, eu quero que coloque dentro da promisse
                    // o "categories"
                    resolve(categories);
                })
                .on('error', err => {
                    reject(err);
                });
        });
        // Esse return "return categories;" não espera a finalização da leitura do arquivo. Assim sendo, no insomnia ele retorna
        // um array vazio. Então é preciso esperar a finalização da leitura de todo o arquivo,
        // para só depois o return retornar com o array com todas os dados.
        // Para isso é preciso transformar tudo numa promisse.
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        // Então ele vai esperar essa function loadCategories(file) finalizar para só depois printar o categories
        // console.log(categories);
        // O map percorre o array
        categories.map(async category => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
