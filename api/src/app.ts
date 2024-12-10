import express, { Application, Request, Response } from "express";
import cors from "cors";
import UsersController from "./controllers/UsersController";
import ActivitiesController from "./controllers/ActivitiesController";

const app: Application = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true})) //Controla la extensión de la info de la URL

app.get('/', (_req:Request, res:Response) =>{
    res.send('Howdy desde mi servidor con TS')
});

//Rutas de usuario
app.post("/user/register", UsersController.register);
app.post("/user/login", UsersController.login);

//Rutas de actividades
app.post("/activity/create", ActivitiesController.create)
app.get("/activity/get", ActivitiesController.get);
app.delete("/activity/delete/:id", ActivitiesController.delete);
app.put("/activity/update/:id", ActivitiesController.update);

export default app;