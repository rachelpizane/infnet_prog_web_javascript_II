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
    
    if(validaCampos){
        if(validaQuantidade){ // Separamos os ifs pois se caso a validação seja falsa, cada um retornará um alert diferente.
            if(validaPreco){
                alert(`Venda registrada com sucesso! [nº ${numeroTransacao}] \nProduto: ${produto} \nQuantidade: ${quantidade} \nPreço: R$ ${preco.toFixed(2).toString().replace(".", ",")} \nData: ${data}`)
            } else{
                alert("Problema na validação do Preço Unitário")
            }

        } else{
            alert("Problema na validação da quantidade de produtos")
        }
        
    } else{
        alert("Problema na validação dos campos obrigatórios")
    }
}

// registrarVenda("Refrigerante", 3, 4.50)
// registrarVenda("Arroz", 2, 1.75)
// registrarVenda("Feijão", 7, 6.50)
// registrarVenda("Chocolate", 5, 2)

// Rascunho
let dataAtual = new Date();
console.log(dataAtual.getDate())
dataAtual.setDate(10) // hm.. ele muda o dia da data, mas deixa o restante igual.
console.log(dataAtual)

