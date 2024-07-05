/*
Export
- A palavra-chave export é usada para exportar funções, objetos, ou valores de um módulo para que possam ser utilizados em outros módulos.
- Podemos exportar por duas formas: Exportação Padrão e Exportação Nomeada.
*/

/* Exportação Nomeada

- Com essa forma podemos exportar múltiplos valores de um módulo.
- Para importar um valor com esse tipo, é necessário utilizar o mesmo nome do valor definido no seu módulo de origem.
- Depois do "export" podemos usar let, const, var, function, classes.
- Para exportar tudo:
    export {function, declaracao, etc}
*/ 
export class Aluno {
    constructor(nome, serie){
        this.nome = nome;
        this.serie = serie;
    }
    imprimir(){
        return `Nome: ${this.nome} - Série: ${this.serie}`;
    }
}

export function imprimirNome(aluno){
    return "Nome: " + aluno.nome;
}

export const num = 2;

// Para enviar tudo junto:
// export {Aluno, imprimirNome, num}

/*

Exportação Padrão
- É utilizado para exportar um único valor de um módulo.
- Quando importamos um módulo que possui um export default, podemos dar qualquer nome a ele.
- Depois do "export default" podemos usar uma expressão, function e classes.
*/ 

export default function imprimirSerie(aluno){
    return "Serie: " + aluno.serie;
}

// expor default "Bem-vinda!"
