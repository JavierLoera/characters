import express from 'express';
import dotenv from "dotenv"
import { connection } from "./config/dbConection.js"
import { errorHandler } from "./middlewares/errorHandler.js"
import pokemonRoute from "./routes/PokemonRoute.js"
import abilitiesRoute from "./routes/AbilitiesRoute.js"
import pokeApiRoute from "./routes/PokeApiRoute.js"
import cors from "cors"

dotenv.config()
connection()
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));


app.use('/api/v1/pokemon', pokemonRoute)
app.use('/api/v1/abilities', abilitiesRoute)
app.use('/api/v1/poke-api', pokeApiRoute)
// catch 404 and forward to error handler
app.use("*", function (req, res) {
  res.status(404).json({ message: "NOT FOUND", status: 404 })
})

app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server running on: http://localhost:${PORT}`))
