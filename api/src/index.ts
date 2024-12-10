import app from "./app";
import mongoose from "mongoose";

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ToDoList')
        console.log('Conexión a la DB creada con éxito');
        app.listen(4000, ()=>{
            console.log('Servidor funcionando con éxito');
        })
        
    } catch (error) {
        console.log('Oops! Ocurrió un error al inicializar la aplicación');
    }
}

main();