import { estoque } from "./script.js";

export function validarNomeProduto(produto) {
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
export function validarQuantidadeProdutos(quantidade) {
  return quantidade > 0 && quantidade;
} //O ideal é criar uma função para cada tipo de validação;

export function validarPrecoUnitario(preco) {
  return preco > 0 && preco;
}

export function validarMotivo(motivo) {
  return motivo;
}
