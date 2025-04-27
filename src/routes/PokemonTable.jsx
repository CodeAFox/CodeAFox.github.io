import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PokemonTable(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [pokemonList, setPokemonList] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const navigate = useNavigate();

    const limit = searchParams.get("limit");
    let offset = searchParams.get("offset");

    useEffect(() => fetchPokemon(limit, offset, setNextPage, setPokemonList), [limit, offset])

    let pokeList = pokemonList.map(pokemon => {
        return(
            <PokemonInfo key={pokemon.id} id = {pokemon.id} name = {pokemon.name} sprite={pokemon.sprite} onClick={handleNavigateToPokemon}/>
        )
    })

    function handleGoBack()
    {
        if(offset > 0)
        {
            let travelTo = parseInt(offset) - parseInt(limit);
            navigate(`/?limit=20&offset=${travelTo}`)
        }
    }

    function handleGoForward()
    {
       if(nextPage != null)
        {
            let travelTo = parseInt(offset) + parseInt(limit);
            navigate(`/?limit=20&offset=${travelTo}`)
        } 
    }

    function handleNavigateToPokemon(id)
    {
        navigate(`/pokemon/${id}`)
    }

    return (
        <div>
            <div className="buttons">
                <Button buttonText="Back" onClick={handleGoBack} />
                <Button buttonText="Next" onClick={handleGoForward} />
            </div>
            <div className="pokemonTable">
                {pokeList}
            </div>
            
        </div>
    )
}

function PokemonInfo({name, id, sprite, onClick}){
    return (
        <div onClick={() => onClick(id)}>
            <div className="pokemonBox">
                <div>
                    <p>#{id}</p>
                    <p>{name}</p>
                </div>
                <img src={sprite}></img>
            </div>
        </div>
    )
}

function Button({onClick, buttonText})
{
    return(
        <button
            onClick={onClick}>
                {buttonText}
        </button>
    )
}

function fetchPokemon(limit, offset, setNextPage, setPokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Something went wrong");
            }
        })
        .then(jsonList => {
            setNextPage(jsonList.next);
            let promises = jsonList.results.map(pokemon => {
                return fetch(pokemon.url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error("Couldn't get details on the pokemon");
                        }
                    })
                    .then(pokeInfo => {
                        return {
                            name: pokemon.name,
                            id: pokeInfo.id,
                            sprite: pokeInfo.sprites.front_default
                        };
                    });
            });

            return Promise.all(promises);
        })
        .then(pokeList => {
            setPokemon(pokeList);
        })
        .catch(err => console.log(err));
}