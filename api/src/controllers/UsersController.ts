import { Request, Response } from "express";
import { UserModel } from "../models/Users";

export default {
    register: async (req:Request, res:Response)=>{
        try {
            //Obtener info de la petición
            const name = req.body.name;
            const password = req.body.password;
            const email = req.body.email;
            const rol = req.body.rol;

            //Validar info existente
            if(!name || !password || !email || !rol){
                res.status(400).json({msg:"Campos requeridos vacíos"})
                return;
            }

            //Registro en BD
            await UserModel.create({
                name,
                password,
                email,
                rol
            });

            res.status(200).json({msg:"¡Usuario registrado exitosamente!"})
            return;
            
        } catch (error) {
            console.log("El error ocurrido: ", error);
            res.status(500).json({msg:"Ocurrió un error al registrar usuario :("})
            return;
        }
    },
    login: async (req:Request, res:Response)=>{
        try {
            //Obtener datos
            const email = req.body.email;
            const password = req.body.password;

            //Buscar usuario
            const user = await UserModel.findOne({
                email,
                password
            });

            //Validar usuario existente
            if(!user){
                res.status(400).json({msg:"No se encontró el usuario con ese email/contraseña"})
                return;
            }
            res.status(200).json({msg:"Inicio de sesión existoso", user});
            return;

        } catch (error) {
            console.log("El error ocurrido: ", error);
            res.status(500).json({msg:"Ocurrió un error al iniciar sesión"})
            return;
        }
    }
}