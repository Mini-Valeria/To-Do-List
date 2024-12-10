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
    get: async (req: Request, res: Response) => {
        try {
            const { idUser } = req.query;

            let activities;
            if (idUser) {
                const user = await UserModel.findById(idUser);
                if (!user) {
                    res.status(400).json({ msg: "El usuario no existe" });
                    return;
                }

                activities = await activities.find({ idUser });
            } else {
                activities = await activities.find();
            }

            res.status(200).json({ msg: "Actividades obtenidas exitosamente", tasks: activities });
        } catch (error) {
            console.error("Error ocurrido:", error);
            res.status(500).json({ msg: "Ocurrió un error al obtener las actividades" });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(400).json({ msg: "ID de la actividad requerido" });
                return;
            }

            if (!/^[0-9a-fA-F]{24}$/.test(String(id))) {
                res.status(400).json({ msg: "ID no válido" });
                return;
            }

            const activity = await ActivityModel.findById(id);
            if (!activity) {
                res.status(404).json({ msg: "Actividad no existente" });
                return;
            }

            await ActivityModel.deleteOne({ _id: id });

            res.status(200).json({ msg: "Actividad eliminada exitosamente" });
        } catch (error) {
            console.error("Error al eliminar:", error);
            res.status(500).json({ msg: "Ocurrió un error al eliminar actividad" });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const { status } = req.body;
            const { id } = req.params; //Parámetros de la URL
    
            if (!id || !status) {
                res.status(400).json({ message: "Estado e ID obligatorios" });
                return 
            }
    
            //Verifica que sea válido
            if (!["Active", "Pending", "Completed"].includes(status)) {
                res.status(400).json({ message: "Estado inválido" });
                return
            }
    
            //Actualiza unicamente el estado
            const updatedActivity = await ActivityModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
    
            if (!updatedActivity) {
                res.status(404).json({ message: "No se ha encontrado la actividad" });
                return;
            }
    
            res.status(200).json({
                message: "Actividad actualizada exitosamente.",
                data: updatedActivity,
            });
        } catch (error) {
            console.log("Error al actualizar:", error);
            res.status(500).json({ message: "Error interno del servidor :(" });
        }
    }
}