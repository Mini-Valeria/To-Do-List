//CRUD ACTIVIDADES
import { Request, Response } from "express";
import { ActivityModel } from "../models/Activities";
import { UserModel } from "../models/Users";

export default {
    create: async (req: Request, res: Response) => {
        try {
            //Obtener datos
            const title = req.body.title;
            const dateEnd = req.body.dateEnd;
            const description = req.body.description;
            const status = req.body.status;
            const idUser = req.body.idUser;

            //Validar dato existente
            if (!title || !dateEnd || !description || !status || !idUser) {
                res.status(400).json({ msg: "Campos requeridos vacíos" })
                return;
            }
            //Validar usuario existente
            const user = await UserModel.findById(idUser);
            if (!user) {
                res.status(400).json({ msg: "El usuario que intentó crear la actividad no existe" })
                return;
            }

            const activity = await ActivityModel.create({
                title,
                dateEnd,
                description,
                status,
                idUser
            });

            res.status(200).json({ msg: "¡Actividad creada exitosamente!", activity });
            return;

        } catch (error) {
            console.log("El error ocurrido: ", error);
            res.status(500).json({msg:"Ocurrió un error al crear la actividad :("})
            return;
        }
    },
    deleteUser:async (req, res) =>{
        try {
            const id= req.params.id
            const user = await ActivityModel.findById(id);
            if(!user){
                res.status(400).json({
                    "msg": "No se encontro la actividad a eliminar"
                })
                return;
            }
            await ActivityModel.deleteOne({
                _id:id
            });
            res.status(200).json({
                "msg": "Actividad eliminada con exito"
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Ocurrio un error al eliminar una actividad"});
            return;
        }
    }
}