// Inserindo tipagens para category. Essa classe cria um modelo que deverá ser seguido
// Importando Entity
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

// Definindo que essa classe vai ser uma entidade. Ou seja, fazendo a integração de uma Entidade com o TypeORM.
// Decorators
@Entity('categories')
class Category {
    // Referenciando cada atributo para virar uma coluna na tabela categories
    @PrimaryColumn()
    id?: string; // Não vamos definir como uuid e sim como String. Atributo opcional

    @Column()
    name: string;

    @Column()
    description: string;

    // O typeorm já tem uma notation para usar como create de data.
    // Então a responsabilidade de criar uma data agora é do banco de dados
    @CreateDateColumn()
    created_at: Date;

    // Vou criar esse construtor para que se evite criar um id novo ao querer fazer uma edição por exemplo.
    // Então sempre que essa classe for instanciada, vai ocorrer essa verificação para saber se o
    // id já existe ou não.
    // Então a responsabilidade de criar um atributo id estará aqui agora nesse construtor
    constructor() {
        if (!this.id) {
            // Ou seja, se o id não existe, será criado um novo id
            this.id = uuidV4();
        }
    }
}

export { Category };
