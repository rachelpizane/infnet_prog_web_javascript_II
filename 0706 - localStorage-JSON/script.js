let array = [2,5,7,1]
let fruta = {
  nome: "banana",
  cor: "laranja",
  preco: 2.50
}

let arrayJSON = JSON.stringify(array) // Convertemos para string com JSON. Serialização


localStorage.setItem("numeros", arrayJSON);  // Guardamos no armazenamento local o vetor convertido e etiquetamos como "numeros";

let numerosLocal = localStorage.getItem("numeros"); // Retiramos o vetor que estava guardado

let numerosLocalJSON = JSON.parse(numerosLocal) // Recuperamos os valores para seus tipos originais -  Desserialização
console.log(numerosLocalJSON) // (4) [2, 5, 7, 1] 
console.log(typeof numerosLocalJSON) // O dado é do tipo objeto

console.log(numerosLocal) //Curiosidade: Se não analisarmos o dado, ele continuará como uma string
console.log(typeof numerosLocal) // O dado é do tipo string


console.log("\n------\n\n")
// Mesmo procedimento com fruta
let frutaJSON = JSON.stringify(fruta) 

localStorage.setItem("fruta", frutaJSON);

let frutaLocal = localStorage.getItem("fruta");
let frutaLocalJSON = JSON.parse(frutaLocal);
console.log(frutaLocalJSON)
console.log(typeof frutaLocalJSON) // Objeto

console.log(frutaLocal)
console.log(typeof frutaLocal) // string

document.getElementById("text").innerHTML = numerosLocalJSON


let textfrutaLocalJSON = document.getElementById("text2")

for(i in frutaLocalJSON){
  textfrutaLocalJSON.innerHTML  += `${i}:${frutaLocalJSON[i]} `
}


// Hm.. Como estamos no mesmo dominio o estoque continua no localStorage
let estoque = localStorage.getItem("mercearia-estoque") 
estoque = JSON.parse(estoque)
console.log(estoque)
console.log(JSON)
/*
O que é localStorage? (Armazenamento Local)
- É um API de armazenamento fornecida pelos navegadores web que permite armazenar dados de forma persistente no navegador do usuário. 
- É como se cada navegador disponibilizasse uma caixinha para guardar alguns dados da pagina.
- Mesmo que usuário feche a aba e retorne, os dados armazenados continuarão lá.
- Os dados não possuem prazo de validade.
- Cada domínio (site) tem seu proprio "localStorage". Isso significa que os dados podem ser compartilhados entre diferentes paginas do mesmo dominio.
- O espaço de armazenamento geralmente é limitado a cerca de 5-10 MB por domínio.
- LocalStorage só suporta armazenamento de strings. Se você quiser armazenar outros tipos de dados, vai ter que convertê-los para string com "JSON.stringify()" e usar "JSON.parse()" ao recuperá-los.
- Os dados são armazenados como pares chave-valor.
- Também existe "sessionStorage", contudo a sua diferença é que os dados persistem apenas durante a sessão da página, quando aba fecha os dados são removidos.
- É possivel acompanhar e editar o armazenamento pelo Inspecionar > Application > Local Storage > Acessar o dominio atual

Quais são os principais metodos e propriedades utilizados no objeto localStorage?
.setItem('chave', 'valor') -> Armazena dados 
.getItem('chave') -> Recupera dados a partir de sua chave
.removeItem('chave') -> Remover um item
.clear() -> Limpar todos os dados
.length -> Verificar tamanho do armazenamento



O QUE É JSON??
- O que significa as siglas?
  * JavaScript Object Notation (Notação de objeto JavaScript)

- O que é?
  * É um formato de texto para troca de dados

- Quando ele foi criado? 
  * Ele foi criado em meados dos anos 90 por Douglas Crockford
  * Ele precisava de um formato de dados simples que pudesse ser facilmente lido e escrito pelo JavaScript, e que pudesse ser usado para trocar dados entre o servidor e o cliente.

- Para que ele foi criado? 
  * JSON (JavaScript Object Notation) é um formato de dados que é usado para armazenar e trocar informações entre sistemas.
  * Uma forma simples de armazenar, organizar, ler e compartilhar dados em aplicativos e serviços web
  * Amplamente utilizado para comunicação assíncrona entre navegador e servidor,
  * Muito utilizado com API
  * JSON não é uma linguagem de programação
  
- Como é sua sintaxe?
  * Os dados são apresentados em um formato textual básico, que consiste em pares “chave / valor”.
    Exemplo de formato:
      {
      "nome":  "Rachel Maia",
      "idade": 26,
      "cidade": "Rio de Janeiro"
      }
  
  * Essas informações podem ser facilmente lidas e interpretadas por um programa que entenda a sintaxe JSON.

- Quais linguagens podem utilizá-lo?
  * Inicialmente esse formato estava estritamente relacionado ao JavaScript, entretanto, ele também pode ser gerado e lido pela maioria das linguagens de programação. 

- Observações:
  * Pelo o que entendi, a comunicação protocolo HTTP entre cliente e servidor exige que os dados sejam enviados como texto é. Por isso é necessário serializar e desserializar via JSON.
    Serialização - objeto > string
    Desseralização - string > objeto
  *Além disso, JSON é um formato que é suportado por quase todas as linguagens, ou seja, todo mundo consegue interpreta-lo. Ou seja, se eu quiser enviar dados para um servidor, eu irei converte-lo em JSON e quando chegar no servidor ele vai interpetá-lo.
  * É tipo como se todo mundo soubesse falar em ingles.
    EX1: Eu crio um texto em portugues, traduzo para o ingles para que as essoas dos outros paises possam lê-lo e traduzi-lo em sua linguas originais de forma mais fácil.
    EX2: É mais fácil eu trazudir um texto do ingles para portugues, do que do japones para portugues.



Quais são os principais metodos e propriedades?
.stringify()  Serialização - pega um estrtura de dados do JavaScript e o converte em uma string JSON.
.parse()  Desserialização - pega uma string JSON e a converte em uma estrtura de dados do JavaScript
*/ 

