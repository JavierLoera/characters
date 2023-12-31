import fetch from 'node-fetch';


export const getCharacters = async (req, res, next) => {
    try {
        const { limit, page } = req.query

        const offset = limit * page
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&&offset=${offset}`);
        let data = await response.json();

        // ordenamos alfabeticamente
        data.results.sort((a, b) => a.name.localeCompare(b.name));
        //  obtenemos los detalles de cada pokemon
        const pokemonDetails = await Promise.all(
            data.results.map(async function (pokemon) {
                const response = await fetch(pokemon.url);
                const data = await response.json();
                return {
                    url: pokemon.url,
                    abilities: data.abilities,
                    base_experience: data.base_experience,
                    height: data.height,
                    name: data.name,
                    weight: data.weight,
                    photo: data.sprites.other['official-artwork']['front_default']
                }
            }))


        data = {
            ...data, results: pokemonDetails, message: 'Datos obtenidos con extio'
        }

        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
}