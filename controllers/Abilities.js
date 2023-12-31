import { Ability } from "../models/Ability.js";

export const getAbilities = async (req, res, next) => {
    try {
        const abilities = await Ability.find()
        res.status(200).json({
            "status": "success",
            "message": "datos obtenidos con exito",
            data: abilities
        })
    } catch (error) {
        next()
    }
}