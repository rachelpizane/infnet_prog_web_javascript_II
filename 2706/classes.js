export class Aluno {

    idade;

    constructor (nome, mensalidade){
        this.nome = nome;
        this.mensalidade = mensalidade;
        //this.nome significa que o nome é uma propriedade do objeto.
    }

    imprimir(){
        return "Nome: " + this.nome + " - Idade: " + this.idade + " - Mensalidade: " + this.mensalidade + " - "
    }
}

//"Tudo é que da minha mãe, é meu também!"
export class Posgraduando extends Aluno {
    constructor(nome, mensalidade, anoFimGraduacao) {
        super(nome, mensalidade) // não entendi a necessidade disso, visto q ele ja chama o da mãeo, farei alguns teste.
        this.anoFimGraduacao = anoFimGraduacao;
    }
    imprimir() {
        return `${super.imprimir()} Ano de Conclusão: ${this.anoFimGraduacao}`
    }
}

//O "extends" é uma palavra reservada que indica que a classe Posgraduando é uma extensão da classe Aluno
//O "super" é uma palavra reservada que chama o construtor da classe pai, por exemplo,

/*
Classe
- Uma classe é um modelo para a criação de objetos.
- Utilizamos a palavra reservada "class" para definir uma classe.
- A classe abaixo "Fruta" tem um construtor que inicializa as propriedades do objeto.
- A palavra-chave "this" é utilizada para acessar as propriedades do objeto. 
*/
export class Fruta {
    constructor(nome, cor, quantidade, preco){
        this.nome = nome;
        this.cor = cor;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    valorTotal(){
        return this.quantidade * this.preco;
    }

    imprimir(){
        return `Nome: ${this.nome} - Cor: ${this.cor} - Valor Total: ${this.valorTotal()}`
    }
}

/* 
Herança

- Podemos criar uma classe que herda todas propriedades e métodos de uma classe mãe.
- Para isso, usamos a palavra reservada "extends" seguida do nome da classe mãe.
- No nosso exemplo, via de regra, o "class ... extends ..." irá utilizar o método imprimir() da mãe, mas se ele tiver o mesmo método em sua classe, ele irá sobrescrever o método da mãe.
- A palavra reservada "super" pode ser utilizada para chamar o construtor da classe mãe ou o método da classe mãe.
- OBS: Se você quiser que a classe filha tenha construtores diferentes da classe mãe, você pode criar um construtor na classe filha, mas terá que chamar o construtor da classe mãe com a palavra "super", que nem na forma abaixo.
- Já no método imprimir(), você pode acionar o método da classe mãe com a palavra "super" e complementar com o que você desejar para a classe filha.
*/

export class Vegetal extends Fruta {
    dataValidade;
    constructor(nome, cor, quantidade, preco, dataValidade){
        super(nome, cor, quantidade, preco);
        this.dataValidade = dataValidade;
    }
    
    imprimir(){
        return `- ${super.imprimir()} - Data de Validade: ${this.dataValidade}` 
        //Aqui ele chama o método imprimir da classe mãe e complementa com a data de validade. 
        // Aparecerá no console da seguinte forma: Nome: Brócolis - Cor: Verde Valor Total: 17.5 - Data de Validade: 30/09/2021 
    }
}