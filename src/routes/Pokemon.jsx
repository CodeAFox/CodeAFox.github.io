import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Pokemon()
{
    const pokemonId = useParams()

    const [pokemon, setPokemon] = useState({
        name: "",
        sprite: null,
        types: [],
        stats: [],
        abilities: [],
        height: "",
        weight: ""
    })

    useEffect(() => fetchPokemon(), [pokemonId])

    function fetchPokemon()
    {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.id}`)
        .then(response => {
            if(response.ok)
            {
                return response.json();
            }
            else{
                throw new Error("Could not retrieve information about this pokemon.")
            }
        })
        .then(jsonObject => {
            setPokemon({
                ...pokemon,
                name: jsonObject.name,
                sprite: jsonObject.sprites.front_default,
                height: jsonObject.height,
                weight: jsonObject.weight,
                types: jsonObject.types.map(type => type.type.name + ", "),
                stats: jsonObject.stats.map(stat => {
                    return(
                        <p key={stat.stat.name}>
                            {`${stat.stat.name}: ${stat.base_stat}`}
                        </p>
                    )
                }),
                abilities: jsonObject.abilities.map(ability => {
                    return(
                        <p key={ability.slot}>
                            {`${ability.ability.name}`}
                        </p>
                    )
                })
            })
        })
    }

    //fetchPokemon()


    return (
        <div className="pokedexEntry">
            <div className="flexContainer">
                <div>
                    <p className="capitalize">{pokemon.name}</p>
                    
                    <img src={pokemon.sprite}></img>
                </div>
                <div>
                    <p>Types: {pokemon.types}</p>
                    <p>Height: {parseInt(pokemon.height)/10} m</p>
                    <p>Weight: {parseInt(pokemon.weight)/10} kg</p>
                </div>
                <div  className="capitalize">
                    <p>Stats:</p>
                    {pokemon.stats}
                </div>
            </div>
            {pokemon.abilities.length > 0 && <div  className="capitalize"><p>Abilities:</p>{pokemon.abilities}</div>}
            
            
        </div>
    )
}