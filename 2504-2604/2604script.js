let disciplinas = [];
let nextID = 0; // comum em banco de dados

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

function obterLista() {
    let text = "";

    disciplinas.forEach((func) => {
        text = text + `
        ID: ${func.id}
        Nome: ${func.nome}
        Professor: ${func.professor}
        Curso: ${func.curso}
        ---------------------------`; // nao conheço muito o uso da crase e do ${}, pesquisar sobre.
    });

    alert(text)
}
// ------------------------------
let btn = document.getElementById("btn");

btn.addEventListener("click", ()=>{
    let nome = document.getElementById("nome").value;
    let professor = document.getElementById("professor").value;
    let curso = document.getElementById("curso").value;

    incluir(nome, professor, curso)

    atualizarTabela();
})

function atualizarTabela(){
    let tabela = document.getElementById("main-tabela")
    tabela.innerHTML =""
    disciplinas.forEach((func, i) =>{
        let novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
        <td>${func.id}</td>
        <td>${func.nome}</td>
        <td>${func.professor}</td>
        <td>${func.curso}</td>
        <td><button type="button" class="btn btn-link" onclick="alterar(${i})">Alterar</button></td>
        <td><button type="button" class="btn btn-link" onclick="exclusao(${i})">Excluir</button></td>
        ` 
        // nao curti assim, prefiro o meu hahha
        tabela.appendChild(novaLinha)
    });
}

function alterar(i){
    disciplinas[i].nome = prompt("Altere o nome");
    disciplinas[i].professor = prompt("Altere professor");
    disciplinas[i].curso = prompt("Altere o curso");
}

function excluir(i){
    disciplinas.splice(i, 1)
} // rever aula dnv para entender o motivo disso aqui.

function exclusao(i){
    excluir(i);
    atualizarTabela();
} 
