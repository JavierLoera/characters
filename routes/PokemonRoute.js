import express from "express";
import { createPokemon, getOnePokemon, getPokemons, updatePokemon, deletePokemon } from "../controllers/PokemonController.js";
import { photoUpload, imageResize } from "../middlewares/photoUpload.js";

const router = express.Router()

router.post("/", photoUpload.single('photo'), imageResize, createPokemon);
router.get("/", getPokemons);
router.get("/:id", getOnePokemon);
router.delete("/:id", deletePokemon);
router.put('/:id', photoUpload.single('photo'), imageResize, updatePokemon)

export default router