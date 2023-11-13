const form = document.getElementById('conversorMoedas')
form.addEventListener('submit', e => {
    e.preventDefault()  //Usamos o event para que o usuario tenha mais interatividade.
})

async function obtemTaxas (moedaOrigem, moedaDestino) {
    let retorno = 0
    const url = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`
    try{
        const response = await fetch (url)
        const data = await response.json()
        retorno = data [`${moedaOrigem}${moedaDestino}`].bid
        resultado.textContent = retorno //Neste trecho puxamos a API 
    }
    catch (error) {
        console.error(error)
        return null
    }
    return retorno
    //Definimos um valor para que retornasse ao usuario.
}

async function calculaConversao(){
    const moedaOrigem = document.getElementById('moedaOrigem').value
    const moedaDestino = document.getElementById('moedaDestino').value
    const valor = parseFloat(document.getElementById('valor').value)
    const resultado = document.getElementById('resultado')//Puxamos os valores do HTML para o js

    if (moedaDestino && moedaOrigem && moedaOrigem !== moedaDestino){
        const taxaConversao = await obtemTaxas(moedaOrigem, moedaDestino)
        const valorConvertido = (valor * taxaConversao).toFixed(2)
        resultado.textContent = `o valor convertido é ${moedaDestino} ${valorConvertido}`
    } else {
        resultado.textContent = "Moeda destino e origem são iguais, o cálculo não será efetuado"

    }
    return false //Neste ultimo pedaço de codigo, usamos o if e else para que o usuario possa calcular os valores que ele quer converter.
}