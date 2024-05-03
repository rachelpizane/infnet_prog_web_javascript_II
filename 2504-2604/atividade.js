let disciplinas = [];
let nextID = 0


function incluir(nome, professor, curso){
    nextID++

    class disciplina {
        constructor(nome, professor, curso){
            this. id = nextID;
            this.nome = nome;
            this.professor = professor;
            this.curso = curso;
            this.alterar = function(){
                let opcao;
                do {
                    opcao = Number(prompt(`O que você deseja alterar?
                    1 - Disciplina
                    2 - Professor
                    3 - Curso
                    4 - Salvar Alterações`))
                    switch(opcao){
                        case 1:
                            this.nome = prompt("Informe novo nome da disciplina");
                            break;
                        case 2:
                            this.professor = prompt("Informe novo nome do professor");
                            break;
                        case 3:
                            this.curso = prompt("Informe novo nome do curso");
                            break;
                        case 4:
                            alert("Alterações salvas!")
                            break;
                        default: 
                        alert("Escolha um opção válida")   
                    }
                }while(opcao != 4);
            };
            this.ativo = true;
        }
    }

    disciplinas.push(new disciplina(nome, professor, curso))
}

function excluir(i){
    disciplinas[i].ativo = false;
    // disciplinas.splice(i, 1); // se eu excluir de fato ele nao afetará as cores ta minha tabela..
}

function atualizarTabela(){
    let tabela = document.getElementById("main-tabela");
    
   tabela.innerHTML =""; 
    disciplinas.forEach((disciplina, i)=>{
        let novaLinha = document.createElement("tr");
        
        for(j in disciplina){
            let novaCelula = document.createElement("td");

            if(disciplina.ativo === true){
                if(j === "ativo"){
                    novaCelula.innerHTML = `<button class="table-btn" onclick="exclusao(${i})">Excluir</button>`;
                } else if(j === "alterar"){
                    novaCelula.innerHTML = `<button class="table-btn" onclick="alteracao(${i})">Alterar</button>`;
                }else {
                    novaCelula.innerHTML = disciplina[j];
                }
                
                novaLinha.appendChild(novaCelula)
            } 
            
        }
        tabela.appendChild(novaLinha);
    });    
}

function obterLista() { // Não estou utilizandp.
    let text = "";

    disciplinas.forEach((func) => {
        text = text + `
        ID: ${func.id}
        Nome: ${func.nome}
        Professor: ${func.professor}
        ---------------------------`; // nao conheço muito o uso da crase' e do ${}, pesquisar sobre.
    });
    alert(text)
}

// -------------------------------

function inclusao() {
    let nome = document.getElementById("disciplina");
    let professor = document.getElementById("professor");
    let curso = document.getElementById("curso");

    incluir(nome.value, professor.value, curso.value)
    nome.value = "";
    professor.value  = "";
    curso.value = "";

    atualizarTabela()
}

function exclusao(i){
    excluir(i)
    atualizarTabela();
}

function alteracao(i){
    disciplinas[i].alterar();

    atualizarTabela();
}