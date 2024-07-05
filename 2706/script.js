import { Aluno, Posgraduando, Fruta, Vegetal} from './classes.js';

// Pesquisar sobre import/from, export e type="module";

const alunos = [];

let primeiroAluno = new Aluno("Carlos", 1700);
// O "new" é uma palavra reservada que cria um novo objeto. Ela instancia um objeto da classe Aluno
//"Aluno()" é o construtor da classe Aluno que cria um novo objeto

primeiroAluno.idade = 20;  
// Atribuindo valores para as propriedades do objeto

alunos.push(primeiroAluno);
// Adicionando o objeto no array

let segundoAluno = new Aluno("Fernanda", 2200);

segundoAluno.idade = 32;  

alunos.push(segundoAluno);

let terceiroAluno = new Posgraduando("Rachel", 1500);
terceiroAluno.idade = 26;
terceiroAluno.anoFimGraduacao = 2023;

alunos.push(terceiroAluno);

alunos.forEach(aluno => {
    console.log(aluno.imprimir());
})


// OBS: Achei prático o uso do método imprimir() para exibir as informações de cada


let banana = new Fruta("Banana", "Amarela", 10, 2.5);
console.log(banana.imprimir());

let brocolis = new Vegetal("Brócolis", "Verde", 5, 3.5);
brocolis.dataValidade = "30/09/2021";
console.log(brocolis.imprimir());