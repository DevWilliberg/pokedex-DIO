/*
function converterTipoPokemonParaLi(pokemonTypes){
    return pokemonTypes.map((typeSlot) => `<li class="tipo"> ${typeSlot.type.name} </li>`)
        
}
*/
const pokemonList = document.getElementById('pokemonList')
const carregaListaButton = document.getElementById('carregaListaButton')
const limit = 8;
const offset = 0;

function converterPokemonParaHtml(pokemon){
    return `
            <li class="pokemon ${pokemon.tipo}">
                    <span class="numero">#${pokemon.numero}</span>
                    <span class="nome">${pokemon.nome}</span>
                    <!--lista de tipo do pokemom-->
                   
                    <div class="detalhe">

                        <ol class="tipos">
                            ${pokemon.tipos.map((tipo) => `<li class="tipo ${tipo}"> ${tipo} </li>`).join('')}
                            
                        </ol>
                        
                        <img src="${pokemon.foto}"
                         alt ="${pokemon.name}">
                    </div>   
             </li> 
             `
}



function carregaPokemonItens(offset=0, limit=5){
    //Requisição de buscar da lista e recebemos
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
    
        //convertendo a lista em recebida em HTML e concatena (join) tornando um novo HTML
            const newHtml = pokemons.map(converterPokemonParaHtml).join('')
            pokemonList.innerHTML += newHtml
        
        })
        

}

carregaPokemonItens(offset,limit)



carregaListaButton.addEventListener(`click`, () =>{
    offset += limit
    carregaPokemonItens(offset,limit);
})