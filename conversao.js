const form = document.getElementById('conversorMoedas')
form.addEventListener('submit', e => {
    e.preventDefault()
})

async function obtemTaxas (moedaOrigem, moedaDestino) {
    let retorno = 0
    const url = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`
    try{
        const response = await fetch (url)
        const data = await response.json()
        retorno = data [`${moedaOrigem}${moedaDestino}`].bid
        resultado.textContent = retorno
    }
    catch (error) {
        console.error(error)
        return null
    }
    return retorno
}

async function calculaConversao(){
    const moedaOrigem = document.getElementById('moedaOrigem').value
    const moedaDestino = document.getElementById('moedaDestino').value
    const valor = parseFloat(document.getElementById('valor').value)
    const resultado = document.getElementById('resultado')

    if (moedaDestino && moedaOrigem && moedaOrigem !== moedaDestino){
        const taxaConversao = await obtemTaxas(moedaOrigem, moedaDestino)
        const valorConvertido = (valor * taxaConversao).toFixed(2)
        resultado.textContent = `o valor convertido é ${moedaDestino} ${valorConvertido}`
    } else {
        resultado.textContent = "Moeda destino e origem são iguais, o cálculo não será efetuado"

    }
    return false
}