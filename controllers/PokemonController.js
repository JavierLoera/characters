import { validateMongoDbID } from "../utils/validateId.js"
import { Pokemon } from "../models/pokemon.js";
import { ExceptionHandler } from "../middlewares/errorHandler.js";

export const createPokemon = async (req, res, next) => {
    try {
        const body = req.body;
        const pokemon = await Pokemon.create({
            abilities: body.abilities,
            base_experience: body.base_experience,
            height: body.height,
            name: body.name,
            weight: body.weight,
            photo: `/images/${req.file.filename}`
        })

        const populatedPokemon = await Pokemon.findById(pokemon._id)
            .populate({
                path: 'abilities',
                select: ['name'],
            });

        res.status(201).json({
            "status": "success",
            "message": "creado",
            data: populatedPokemon
        })
    } catch (error) {
        next(error)
    }
}


export const getOnePokemon = async (req, res, next) => {
    try {
        const { id } = req.params
        validateMongoDbID(id)
        const pokemon = await Pokemon.findById(id).populate({ path: 'abilities', select: ['name'] })
        if (!pokemon) {
            return new ExceptionHandler(`No se ha encontrado el Pokémon con la ID ${id}`, 404);
        }
        res.status(200).json({
            "status": "success",
            "message": "Datos obtenidos correctamente",
            data: pokemon
        })
    } catch (error) {
        next(error)
    }
}

export const getPokemons = async (req, res, next) => {
    try {
        const pokemons = await Pokemon.find().populate({ path: 'abilities', select: ['name'] })

        res.status(200).json({
            "status": "success",
            "message": "Datos obtenidos correctamente",
            data: pokemons
        })
    } catch (error) {
        next(error)
    }
}

export const updatePokemon = async (req, res, next) => {
    try {
        const body = req.body
        const { id } = req.params
        validateMongoDbID(id)

        const pokemon = await Pokemon.findById(id);
        if (!pokemon) {
            throw ExceptionHandler('Pokémon no encontrado', 404)
        }

        Object.keys(body).forEach(key => {
            pokemon[key] = body[key];
        });

        if (req.file) {
            pokemon['photo'] = `/images/${req.file.filename}`
        }

        await pokemon.save();

        const pokemonPopulated = await Pokemon.findById(pokemon._id).populate({ path: 'abilities', select: ['name'] })
        res.status(200).json({
            "status": "success",
            "message": "actializado correctamente",
            data: pokemonPopulated
        })
    } catch (error) {
        next(error)
    }
}


export const deletePokemon = async (req, res, next) => {
    try {
        const { id } = req.params
        validateMongoDbID(id)

        await Pokemon.findOneAndDelete({ _id: id })
        res.status(204).json(
            {
                "status": "success",
                "message": "elemento eliminado correctamente",
            }
        )
    } catch (error) {
        next(error)
    }
}