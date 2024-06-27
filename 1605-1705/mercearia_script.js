const estoque = {
  Churrasco: {
    descricao: "churrasco do Elberth",
    qtde: 10,
    preco: 30.0,
    limite: 5,
    historico: [],
  },
  Bauru: {
    descricao: "bauru do Elberth",
    qtde: 15,
    preco: 18.0,
    limite: 18,
    historico: [],
  },
  Empada: {
    descricao: "empada do Elberth",
    qtde: 20,
    preco: 15.0,
    limite: 12,
    historico: [],
  },
  "Cachorro-quente": {
    descricao: "cachorro-quente do Elberth",
    qtde: 25,
    preco: 12.5,
    limite: 30,
    historico: [],
  },
};

/* 
- Em javascript podemos definir as propriedades entre aspas ou não. Sendo obrigatorio o seu uso quando forem palavras com caracteres especiais(espaços, hifens, etc...)
- JSON não é uma linguagem de programação
- JSON é um tipo de anotação para transferência de dados que segue um padrão especifico
-Sua estrutura clara e padronizada facilita a troca de dados entre diferentes sistemas e linguagens de programação, tornando-o uma escolha popular para APIs e configurações.
*/

function validarNomeProduto(produto) {
  if (produto && produto in estoque) {
    return true;
  }
  return false;
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

function validarQuantidadeProdutos(quantidade) {
  return quantidade > 0 && quantidade;
} //O ideal é criar uma função para cada tipo de validação;

function validarPrecoUnitario(preco) {
  return preco > 0 && preco;
}

function validarMotivo(motivo) {
  return motivo;
}

function obterDataTransacao() {
  return new Date().toLocaleString(); //retorna data e hora em forma de String, usando a configuração da locadalicaade (dd/mm/yyy, hh:mm:ss
} // Não é necessario criar uma função para tudo, mas para reforçar o entendimento, faremos assim por agora.

function obterNumeroTransacao() {
  return Math.floor(Math.random() * 999999);
}

function reduzirEstoque(produto, quantidade) {
  //RN.07 - Atualização Automática do Estoque
  estoque[produto].qtde -= quantidade;
}

function adicionarEstoque(produto, quantidade) {
  estoque[produto].qtde += quantidade;
}

function capturarDadosSaida() {
  // Aqui capturaremos os dados inputados pelo usuario, chamaremos a função para validar e chamaremos a função de registrar no historico as vendas

  let produto = document.getElementById("produto").value;
  let quantidade = parseInt(document.getElementById("quantidade").value);
  let preco = document.getElementById("preco").value;

  let DadosVendaValidados = registrarSaida(produto, quantidade, preco); // Aqui os valores serão validados. Retornando se são validos ou não (isSucess: true/false) + mensagem

  registrarHistorico(
    DadosVendaValidados.isSucess,
    DadosVendaValidados.mensagem
  ); // Acessando as propriedades do return (isSucess, mensagem) da função registrarSaida()
}

function registrarSaida(produto, quantidade, preco) {
  //Nesta função iremos gerar a data e o numero de transação.
  // Por fim iremos validar os inputs:
  //1) Os campos foram preenchidos?
  //2) A quantidade é positiva e valida?
  //3) O preco é positivo e valido?

  let data = obterDataTransacao();
  let numTransacao = obterNumeroTransacao();

  let validaNome = validarNomeProduto(produto);
  let validaQuantidade = validarQuantidadeProdutos(quantidade);
  let validaPreco = validarPrecoUnitario(preco);

  if (validaNome) {
    if (validaQuantidade) {
      // Separamos os ifs pois se caso a validação seja falsa, cada um retornará um alert diferente.

      if (validaPreco) {
        estoque[produto].historico.push({
            tipo: "Saída",
            numTransacao: numTransacao,
            data: data,
            quantidade: quantidade,
            //   preco: preco Tirei para ficar alinhado com a entrada, pensarei  no que farei futuramente.
          });

        reduzirEstoque(produto, quantidade);
        atualizarTabelaEstoque();
        return {
          isSucess: true, // Foi sucesso? Sim!
          mensagem:
            "Produto vendido com sucesso! [Número da Transação: " + numTransacao + "] - Produto: " + produto + " - Quantidade: " + quantidade +
 " - Preço: R$" + Number(preco).toFixed(2) + " - Data: " + data + ".",
        };
      } else {
        return {
          isSucess: false, // Foi sucesso? Não..
          mensagem: "Problema na validação do preço unitário.",
        };
      }
    } else {
      return {
        isSucess: false, // Foi sucesso? Não..
        mensagem: "Problema na validação da quantidade de produtos.",
      };
    }
  } else {
    return {
      isSucess: false, // Foi sucesso? Não..
      mensagem: "Problema na validação do nome do produto.",
    };
  }
}

function registrarHistorico(isSucess, mensagem) {
  // Nesta função nós registraremos os dadosvalidados.

  let historico = document.getElementById("historicoVendas");

  if (isSucess) {
    // Se eles estiverem tudo certo, incluiremos no Historico das Vendas

    let registro = document.createElement("li");
    registro.innerHTML = mensagem;
    historico.appendChild(registro);
  } else {
    // Se não, iremos avisar ao usuario por uma chamada.

    let alerta = document.getElementById("divAlerta");
    alerta.className = "alert alert-warning";
    alerta.innerHTML = "<strong>Atenção!!</strong> " + mensagem;
    alerta.style.display = "block";
    setTimeout(() => {
      alerta.style.display = "none";
    }, 7000); // A chamada desaparecerá em 7 segundos.
  }
}

function capturarDadosEntrada() {
  // RN.09 - Registro Detalhado do Estoque:
  // Captura os dados de entrada
  const produto = document.getElementById("produto").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const motivo = document.getElementById("motivo").value;

  alert(registrarEntrada(produto, quantidade, motivo));
}

function registrarEntrada(produto, quantidade, motivo) {
  // Verificar se a entrada é valida, e se sim, adicionar o historico da transacao, atualizar o estoque e a tabela de estoque.
  const data = obterDataTransacao();
  const numTransacao = obterNumeroTransacao();

  const validaNome = validarNomeProduto(produto);
  const validaQuantidade = validarQuantidadeProdutos(quantidade);
  const validaMotivo = validarMotivo(motivo);

  if (validaNome) {
    if (validaQuantidade) {
      if (validaMotivo) {
        estoque[produto].historico.push({
          tipo: "Entrada",
          numTransacao: numTransacao,
          data: data,
          quantidade: quantidade,
        //   motivo: motivo, Tirei para ficar alinhado com a Saida, pensarei depois no que farei futuramente.
        });

        adicionarEstoque(produto, quantidade);
        atualizarTabelaEstoque();

        console.log(estoque[produto].historico.length);
        return (
          "Produto adicionado com sucesso! [Número da Transação: " +
          numTransacao +
          "] - Produto: " +
          produto +
          " - Quantidade: " +
          quantidade +
          " - Data: " +
          data +
          "Motivo: " +
          motivo +
          "."
        );
      } else {
        return "Problema na validação do motivo.";
      }
    } else {
      return "Problema na validação da quantidade de produtos.";
    }
  } else {
    return "Problema na validação do nome do produto";
  }
}

function buscarHistorico() {
  // RN.10 - Histórico de Movimentação de Estoque

  const tabela = document.getElementById("tabelaMovimentacao");
  const produto = document.getElementById("produto").value;
  tabela.innerHTML = "";

  const historicoMeuProduto = estoque[produto].historico;

  historicoMeuProduto.forEach((historico) => {
    const novaLinha = document.createElement("tr");

    novaLinha.innerHTML = `<td>Entrada</td>
        <td>${historico.numTransacao}</td>
        <td>${historico.data}</td>
        <td>${produto}</td>
        <td>${historico.quantidade}</td>`;
  });

  tabela.appendChild(novaLinha);
}

function atualizarTabelaEstoque() {
  // RN.08 - Identificação de Produtos com Baixo Estoque
  let tabela = document.getElementById("tabelaEstoque");
  tabela.innerHTML = "";

  for (let produto in estoque) {
    // ex: produto === Churrasco
    const meuProduto = estoque[produto]; //ex: estoque[Churrasco]

    let limite =
      meuProduto.qtde < meuProduto.limite
        ? "img/flag-green.png"
        : "img/flag-red.png";

    let novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
        <td>${produto}</td> 
        <td>${meuProduto.descricao}</td>
        <td>${meuProduto.qtde}</td>
        <td>R$ ${meuProduto.preco}</td>
        <td>${meuProduto.historico.length}</td>
        <td><img src=${limite}></td>
        `;
    tabela.appendChild(novaLinha);
  }
} // Estamos atualizando e exibindo a tabela com os dados de cada produto no "mercearia_entrada.html"

document.addEventListener("DOMContentLoaded", function () {
  atualizarTabelaEstoque();
});
