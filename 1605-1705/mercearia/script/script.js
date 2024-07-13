import * as validacao from "./validacao.js";
import { carregarEstoque} from "./estoque.js";

export let estoque = carregarEstoque(); 

function salvarEstoque() {
  localStorage.setItem("mercearia-estoque", JSON.stringify(estoque));
} // Envie o objeto estoque, convertido para string, para o local Storage, etiquetado por "mercearia-estoque". Se ele existe, atualize o seu valor, se não, crie-o.

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

  let validaNome = validacao.validarNomeProduto(produto);
  let validaQuantidade = validacao.validarQuantidadeProdutos(quantidade);
  let validaPreco = validacao.validarPrecoUnitario(preco);

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
        salvarEstoque();
        return {
          isSucess: true, // Foi sucesso? Sim!
          mensagem:
            "Produto vendido com sucesso! [Número da Transação: " +
            numTransacao +
            "] - Produto: " +
            produto +
            " - Quantidade: " +
            quantidade +
            " - Preço: R$" +
            Number(preco).toFixed(2) +
            " - Data: " +
            data +
            ".",
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

  const validaNome = validacao.validarNomeProduto(produto);
  const validaQuantidade = validacao.validarQuantidadeProdutos(quantidade);
  const validaMotivo = validacao.validarMotivo(motivo);

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
        salvarEstoque();
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

    let limite = meuProduto.qtde > meuProduto.limite ? "img/flag-green.png" : "img/flag-red.png";
    console.log(meuProduto.qtde < meuProduto.limite)
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

window.addEventListener("DOMContentLoaded", function () {
  atualizarTabelaEstoque();
});

const btnSaida = document.getElementById("btn-saida");
if (btnSaida) {
  btnSaida.addEventListener("click", capturarDadosSaida);
}

const btnEntrada = document.getElementById("btn-entrada");
if (btnEntrada) {
  btnEntrada.addEventListener("click", capturarDadosEntrada);
}
