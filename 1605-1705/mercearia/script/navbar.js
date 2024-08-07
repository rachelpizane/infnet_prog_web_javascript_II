document.body.addEventListener("load", incluirNavBar());

function incluirNavBar(){
    class classLink {
        constructor(link, nome){
            this.link = link;
            this.nome = nome;
        }
    }
    
    linksNav = [
        new classLink("venda.html", "Venda"),
        new classLink("entrada.html", "Entrada"),
        new classLink("movimentacao.html", "Movimentação"),
    ]
    
    let header = document.getElementById("divNavBar")
    
    for(i in linksNav){
        let link = document.createElement("a");
        link.href = linksNav[i].link;
        link.innerText = linksNav[i].nome;
        link.classList.add("nav-link")
        header.appendChild(link)
    }   
    
}