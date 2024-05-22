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
    return produto && quantidade && preco && data // O resultado de uma condição já é um booleano.
    // Não se esqueça, código curto nao significa melhor. As vezes até é pior pois quem ve de fora e bate nesse codigo pode ter um delay até entender o que está acontecendo.
}

function validarQuantidadeProdutos(quantidade){
    return quantidade > 0 ? true : false
} //O ideal é criar uma função para cada tipo de validação.

function registrarVenda(){
    let produto = "Refrigerante";
    let quantidade = 2;
    let preco = 6;
    let data = "2023-06-01";

    let validaCampos = validarCamposObrigatorio(produto, quantidade, preco, data);
    let validaProdutos = validarQuantidadeProdutos(quantidade)
    
    if(validaCampos){
        if(validaProdutos){
            alert(`Venda registrada com sucesso! \nProduto: ${produto} \nQuantidade: ${quantidade} $\nPreço: ${preco.toFixed(2)} \nData: ${data}`)
        } else{
            alert("Problema na validação da quantidade de produtos")
        }
        
    } else{
        alert("Problema na validação dos campos obrigatórios")
    }
}

registrarVenda()
