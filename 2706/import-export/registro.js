/*
Import
- A palavra-chave import é usada para importar funções, objetos, ou valores de um outro módulo para o modulo atual
*/

/* Importação Nomeada

- Ao importar exportações nomeadas, usamos chaves para importar o valor com o mesmo nome que foi exportado. 
- Caso haja mais valores, separamos por vírgula dentro das chaves.
- Sintaxe: import {Nome} from './caminho-do-arquivo.js'; 
*/ 

import {Aluno, imprimirNome, num} from './pessoa.js';

let aluno1 = new Aluno("Carlos", 9);

console.log(imprimirNome(aluno1));

console.log(num)
/* Importação Padrão

- Ao importar uma exportação padrão, podemos usar qualquer nome para importar o valor.
- Sintaxe: import Nome from './caminho-do-arquivo.js';
    Não precisará fazer destructuring ex: {Nome} )
*/ 

import exibirSerie from './pessoa.js'; 
// Nessa caso mudei o nome da função de imprimirSerie para exibirSerie.

console.log(exibirSerie(aluno1));

