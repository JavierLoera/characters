import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
    abilities: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ability",
        }],
        validate: {
            validator: function (arr) {
                return arr.length > 0;
            },
            message: "Al menos una habilidad es requerida"
        }
    },
    base_experience: Number,
    height: Number,
    name: String,
    weight: Number,
    photo: String,
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true,
})


export const Pokemon = mongoose.model("Pokemon", PokemonSchema)