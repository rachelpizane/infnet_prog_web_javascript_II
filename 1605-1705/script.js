const estoque ={
    "Churrasco": {
        "quantidadeTotal": 15,
        "preco": 30.00,
        
    }, // não conhecia esse tipo de estrutura.
    "Arroz": {
        "quantidadeTotal": 23,
        "preco": 3.25
    },
    "Espada": {
        "quantidadeTotal": 22,
        "preco": 10.00
    },
    "Escova": {
        "quantidadeTotal": 35,
        "preco": 2.50
    },
    "Banana": {
        "quantidadeTotal": 9,
        "preco": 4.50
    },
};

function validarCamposObrigatorio(produto, quantidade, preco, data){
    /*Versão completa
    if(produto && quantidade && preco && data){
         return true;
    } else {
        return false;
    } */

    /*Versão ternário - Gostei dessa
    return produto && quantidade && preco && data ? true : false;*/

    // Versão mais encurtada:
    return produto && quantidade != null && preco != null && data // O resultado de uma condição já é um booleano.
    // Não se esqueça, código curto nao significa melhor. As vezes até é pior pois quem ve de fora e bate nesse codigo pode ter um delay até entender o que está acontecendo.
}

function validarQuantidadeProdutos(quantidade){
    return quantidade > 0 ? true : false
} //O ideal é criar uma função para cada tipo de validação. Você encap

function validarPrecoUnitario(preco){
    return !isNaN(preco) && preco > 0;
}

function validarEstoque(produto, quantidade){ // refletir sobre essa função hahaha
    if(estoque[produto] != null){ // "Ele existe?"
        if(estoque[produto].quantidadeTotal >= quantidade){ // "Se sim, tem uma quantidade suficiente no estoque para ser retirado?"
            return true
        }
    }

}

function atualizarEstoque(produto, quantidade){
    alert(`Antes: ${estoque[produto].quantidadeTotal}`)
    estoque[produto].quantidadeTotal -= quantidade
    
    alert(`Depois: ${estoque[produto].quantidadeTotal}`)
}

function obterDataTransacao(){
    return new Date().toLocaleString();
} // Não é necessario criar uma função para tudo, mas para reforçar o entendimento, faremos assim por agora.

function gerarNumeroTransacao(){
    return Math.floor(Math.random() * 1000000)
}

function registrarVenda(produto, quantidade ,preco){
    // let produto = "Refrigerante";
    // let quantidade = 2;
    // let preco = 6;
    let data = obterDataTransacao();

    let numeroTransacao = gerarNumeroTransacao();

    let validaCampos = validarCamposObrigatorio(produto, quantidade, preco, data);
    let validaQuantidade = validarQuantidadeProdutos(quantidade)
    let validaPreco = validarPrecoUnitario(preco)
    let validaEstoque = validarEstoque(produto, quantidade);
    
    if(validaCampos){
        if(validaQuantidade){ // Separamos os ifs pois se caso a validação seja falsa, cada um retornará um alert diferente.
            if(validaPreco){
                if(validaEstoque){

                    atualizarEstoque(produto, quantidade)

                    return `Venda registrada com sucesso! [nº ${numeroTransacao}] Produto: ${produto} Quantidade: ${quantidade} Preço: R$ ${preco} Data: ${data}`
                } else {
                    return "Problema na validação do estoque. Não há estoque suficiente para ser reduzido"
                }
              
            } else{
               return "Problema na validação do Preço Unitário"
            }

        } else{
           return "Problema na validação da quantidade de produtos"
        }
        
    } else{
       return "Problema na validação dos campos obrigatórios"
    }
}

function registrarHistorico(mensagem){
    const historicoVendas = document.getElementById("historicoVendas");
    const divAlerta = document.getElementById("divAlerta")

    const li = document.createElement("li");
    li.textContent = mensagem;
    historicoVendas.appendChild(li);

    divAlerta.classList.add("alert", "alert-sucess");
    divAlerta.innerHTML = "<strong> Sucess</strong>" + mensagem;
}

// Funções que se relacionam com o painel
function vender(){
    let produto = document.getElementById("produto").value
    let quantidade = document.getElementById("quantidade").value
    let preco = document.getElementById("preco").value
    
    let mensagem = registrarVenda(produto, quantidade, preco);

    registrarHistorico(mensagem)
}
