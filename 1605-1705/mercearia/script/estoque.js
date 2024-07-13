// Neste formato, a primeira vez que carregar a pagina, como não haverá um estoque armazenado localmente, ele retornará um objeto pré-configurado
// Explicação mais detalhada sobre localStorage e JSON em "infnet_prog_web_javascript_II\0706 - localStorage-JSON"

export function carregarEstoque() {
  const local = localStorage.getItem("mercearia-estoque");

  console.log(local);
  if (local) { // Se houver um dado chamado "mercearia-estoque"
    return JSON.parse(local); // converta para uma estrutura de dado do Javascript e o retorne
  } else {
    return { // Se não houver e retornar "null", retorne o objeto pre-configurado abaixo.
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
  }
}

