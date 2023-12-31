import { getCharacters } from "../controllers/PokeApiController.js";
import express from "express"

const router = express.Router()
router.get("/", getCharacters);

export default router