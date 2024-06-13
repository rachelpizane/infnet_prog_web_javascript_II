function validarCamposObrigatorio(produto, quantidade, preco){
    if(produto && quantidade && preco){
        return true
    }
    return false
    /*Versão completa
    if(produto && quantidade && preco && data){
         return true;
    } else {
        return false;
    } */

    /*Versão ternário - Gostei dessa
    return produto && quantidade && preco && data ? true : false;*/

    // Versão mais encurtada:
    // return produto && quantidade != null && preco != null && data -> O resultado de uma condição já é um booleano.
    // Não se esqueça, código curto nao significa melhor. As vezes até é pior pois quem ve de fora e bate nesse codigo pode ter um delay até entender o que está acontecendo.
}

function validarQuantidadeProdutos(quantidade){
    return quantidade > 0;
} //O ideal é criar uma função para cada tipo de validação;

function validarPrecoUnitario(preco){
    return preco > 0;
}

function obterDataTransacao(){
    return new Date().toLocaleString() //retorna data e hora em forma de String, usando a configuração da locadalicaade (dd/mm/yyy, hh:mm:ss
} // Não é necessario criar uma função para tudo, mas para reforçar o entendimento, faremos assim por agora.

function obterNumeroTransacao(){
    return Math.floor(Math.random() * 999999)
}

function capturarDadosVenda(){ 
    // Aqui capturaremos os dados inputados pelo usuario, chamaremos a função para validar e chamaremos a função de registrar no historico as vendas

    let produto = document.getElementById("produto").value;
    let quantidade = document.getElementById("quantidade").value;
    let preco = document.getElementById("preco").value;
                                                                                  
    let DadosVendaValidados = registrarVenda(produto, quantidade, preco); // Aqui os valores serão validados. Retornando se são validos ou não (isSucess: true/false) + mensagem  
    
    registrarHistorico(DadosVendaValidados.isSucess, DadosVendaValidados.mensagem) // Acessando as propriedades do return (isSucess, mensagem) da função registrarVenda()
}

function registrarVenda(produto, quantidade, preco){ 
    //Nesta função iremos gerar a data e o numero de transação. 
    // Por fim iremos validar os inputs:
        //1) Os campos foram preenchidos?
        //2) A quantidade é positiva e valida? 
        //3) O preco é positivo e valido?

    let data = obterDataTransacao();
    let numTransacao = obterNumeroTransacao();

    let validaCampos = validarCamposObrigatorio(produto, quantidade, preco);
    let validaQuantidade = validarQuantidadeProdutos(quantidade);
    let validaPreco = validarPrecoUnitario(preco);

    if(validaCampos){
        if(validaQuantidade){ 
            // Separamos os ifs pois se caso a validação seja falsa, cada um retornará um alert diferente.

            if(validaPreco){
                return {
                    isSucess: true, // Foi sucesso? Sim!
                    mensagem: "Produto vendido com sucesso! [Número da Transação: " + numTransacao  + "] - Produto: " + produto + " - Quantidade: " + quantidade + " - Preço: R$" + Number(preco).toFixed(2) + " - Data: " + data + "." 
                }
            } else {
                return {
                    isSucess: false, // Foi sucesso? Não..
                    mensagem:"Problema na validação do preço unitário."
                }
            }
        } else {
            return {
                isSucess: false, // Foi sucesso? Não..
                mensagem: "Problema na validação da quantidade de produtos."
            }
        }
        
    } else {
        return {
            isSucess: false, // Foi sucesso? Não..
            mensagem:"Problema na validação dos campos obrigatórios."
        }
    }
}

function registrarHistorico(isSucess, mensagem){ 
    // Nesta função nós registraremos os dadosvalidados. 

    let historico = document.getElementById("historicoVendas");

    if(isSucess){ 
        // Se eles estiverem tudo certo, incluiremos no Historico das Vendas

        let registro = document.createElement("li");
        registro.innerHTML = mensagem;
        historico.appendChild(registro)
    } else { 
        // Se não, iremos avisar ao usuario por uma chamada.

        let alerta = document.getElementById("divAlerta");
        alerta.className = "alert alert-warning";
        alerta.innerHTML= "<strong>Atenção!!</strong> " + mensagem
        alerta.style.display = "block";
        setTimeout(()=>{
            alerta.style.display = "none";
        }, 7000) // A chamada desaparecerá em 7 segundos.
    }
}