import mongoose from "mongoose";

const AbilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "title is required"]
    },
}, { timestamps: true })

export const Ability = mongoose.model("Ability", AbilitySchema)