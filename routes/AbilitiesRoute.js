import express from "express";
import { getAbilities } from "../controllers/Abilities.js";

const router = express.Router()
router.get("/", getAbilities);
export default router