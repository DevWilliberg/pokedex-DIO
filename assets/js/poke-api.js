// Objeto criado para receber a lista dos pokemons
//
//
//
//
const pokeApi = {}

function converterPokeApiDetailparaPokemon(pokemonsDetail){
    const pokemon = new Pokemon()
    pokemon.numero = pokemonsDetail.order
    pokemon.nome = pokemonsDetail.name
    

    const tipos = pokemonsDetail.types.map((typeSlot) => typeSlot.type.name)
    const [tipo] = tipos

    pokemon.tipos = tipos
    pokemon.tipo = tipo
    pokemon.foto = pokemonsDetail.sprites.other.dream_world.front_default
    
    return pokemon
    

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(converterPokeApiDetailparaPokemon) 

            

}

pokeApi.getPokemons  = (offset = 0, limit = 8) =>{
   
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
//funcao parecida com tratamento de erro try catch  
    return fetch(url)
            .then((response) => response.json())/*Transforma o response do body  em uma promessa(jason)*/
            .then((jsonBody) => jsonBody.results) 
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //pega  a lista de pokemons e transforma em uma lista de promessas do detalhe do pokemon
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) => pokemonsDetails)
                           
}

