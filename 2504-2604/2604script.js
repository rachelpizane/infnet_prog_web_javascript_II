let disciplinas = [];
let cursos = [];
let nextID = 0; // comum em banco de dados

let divDisciplinas = document.getElementById("div-disciplinas");
divDisciplinas.style.display = "none";

function incluir(nome, professor, curso) {
    nextID++;

    let disciplina = {
        id: nextID,
        nome: nome,
        professor: professor,
        curso: curso,
    }

    disciplinas.push(disciplina);
    
}

function excluir(i){
    disciplinas.splice(i, 1)
} // rever aula dnv para entender o motivo disso aqui.


// ------------------------------
let btn = document.getElementById("btn");

btn.addEventListener("click", ()=>{
    let nome = document.getElementById("nome").value;
    let professor = document.getElementById("professor").value;
    let curso = document.getElementById("curso").value;

    incluir(nome, professor, curso)

    atualizarTabela();
})

function atualizarTabela(disciplinasFilter = null){ // Quando um valor padrão é definido para um parâmetro de uma função em JavaScript, este valor é utilizado apenas se nenhum argumento é passado para o parâmetro durante a chamada da função. Se um argumento é passado, o valor padrão é substituído pelo valor do argumento.
    
    let disciplinasExibir = disciplinasFilter == null ? disciplinas : disciplinasFilter;

    //240510: Tentando achar um padrão para cortar apenas 3 valores por pagina.
    // 1 - 0...2
    // 2 - 3...5
    // 3 - 6...9
    //paginaAtual = inicio..fim
    // inicio = (paginaAtual - 1) * disciplinaPorPagina; 
    // fim = disciplinaPorPagina - 1 ou inicio + 2
    //.slice(posInicial, posFinal);
    //posInicial => (paginaAtual - 1) * disciplinaPorPagina
    //posFinal = posInicial + disciplinaPorPagina;
    
    let posInicial = (paginaAtual - 1) * disciplinasPorPagina
    let posFinal = posInicial + disciplinasPorPagina;

    disciplinasExibir = disciplinasExibir.slice(posInicial, posFinal) // Ele retorna apenas os 3 valores que estão na pagina atual

    let tabela = document.getElementById("main-tabela")
    
    divDisciplinas.style.display = "none";
    
    tabela.innerHTML =""
    disciplinasExibir.forEach((func, i) =>{
        let novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
        <td>${func.id}</td>
        <td>${func.nome}</td>
        <td>${func.professor}</td>
        <td>${func.curso}</td>
        <td><button type="button" class="btn btn-link" onclick="alteracao(${i})">Alterar</button></td>
        <td><button type="button" class="btn btn-link" onclick="exclusao(${i})">Excluir</button></td>
        ` 
        tabela.appendChild(novaLinha)
        
    });

    if (disciplinasExibir.length > 0) {
        divDisciplinas.style.display = "block";
      }
}

function alteracao(i){ // tela envolvida, função especifica pra ela.
    let novoNome = prompt("Informe o novo nome da disciplina")
    let novoProfessor = prompt("Informe o novo nome o professor")
    let novoCurso = prompt("Informe o novo nome do curso")
    
    disciplinas[i].nome = novoNome;
    disciplinas[i].professor = novoProfessor;
    disciplinas[i].curso = novoCurso;

    atualizarTabela();
}

function exclusao(i){
    excluir(i);
    atualizarTabela();
} 

inclusaoCurso("Engenharia");
inclusaoCurso("ADS");
inclusaoCurso("Computação");

function inclusaoCurso(curso){
    cursos.push(curso)
    let select = document.getElementById("curso");
    let option = document.createElement("option");
    option.innerText = curso; //text???? Mudei para innerText;
    option.value = curso;
    select.appendChild(option)
} 

function filtrarPorCurso(){ //Muito utilizado!
    let curso = document.getElementById("curso-filtro").value;

    if(curso == ""){ //Se for selecionado "todos", a tabela irá atualizar normalmente
        atualizarTabela()
    } else{ 

        let disciplinasFilter = disciplinas.filter(function(disciplina){
            return curso == disciplina.curso
        }) // O método .filter() chama uma função de callback para cada elemento do vetor. Se o retorno dessa função for verdadeiro, o elemento é incluído no novo vetor resultante. Se for falso, o elemento é ignorado e não faz parte do novo vetor. Outra forma de escrevê-la disciplinas.filter(disciplina => curso == disciplina.curso)

        atualizarTabela(disciplinasFilter)
    }
}

let paginaAtual = 1;
const disciplinasPorPagina = 3; 
// Até o momento nao to entendendo o funcionamento... 

function anterior(){
    if(paginaAtual > 1){
        paginaAtual--
        atualizarTabela();
    }
} // Se a pagina atual for maior que um, então iremos diminui-la e atualizar a tabela com os valores da nova pagina atual.


function proximo(){
    let totalPaginas = Math.ceil(disciplinas.length / disciplinasPorPagina);
    if(paginaAtual < totalPaginas){
        paginaAtual++
        atualizarTabela()
    } 
} // Se a pagina atual for menor que o total de paginas, então iremos aumentá-la e atualizar a tabela com os valores da nova pagina atual.

function pesquisarDisciplinas(){
    let campo = document.getElementById("pesquisaInput").value
    
    // Faremos um tratamento 
    campo = campo.trim() //novo metodo. tira os espaços em volta da string. Não verifica espaços extras entre as palavras
    campo = campo.toLowerCase(); // basearemos em letras minusculas.
    
    let disciplinasFilter = disciplinas.filter(function(disciplina){
        return disciplina.nome.toLowerCase().includes(campo)//Pelo oq eu entendi ele puxa valores parecidos com o campo.  .includes() - novo método!
    })  // Transforme os valores da propriedade nome em minusculo e retorne os que possuirem a sequencia de caracteres igual à da variável "campo" 
  
    atualizarTabela(disciplinasFilter)  
}

// RASCUNHO
// Conhecendo o método .trim()
let palavra = "  Yellow"
console.log(palavra) // "  Yellow"
console.log(palavra.trim()) // "Yellow"

//Conhecendo o metodo .includes()
let outraPalavra = "Javascript"
let teste = "java"

console.log(outraPalavra.includes(teste)) //Ele é sensível a letras maiusculas e minusculas

teste = teste.toLowerCase();
outraPalavra = outraPalavra.toLowerCase()
console.log(outraPalavra.includes(teste))