import mongoose from "mongoose";

export const connection = () => {
    try {
        mongoose.connect(process.env.URL_DB);
    } catch (error) {
        console.log("Hubo un problema al conectarse a la base de datos " + error.message);
        process.exit(1);
    }
}