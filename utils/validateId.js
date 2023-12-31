import mongoose from "mongoose";
import { ExceptionHandler } from "../middlewares/errorHandler.js";

export const validateMongoDbID = id => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if ((!isValid)) throw ExceptionHandler('El id no es valido')
}