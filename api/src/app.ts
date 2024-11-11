import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true})) //Controla la extensión de la info de la URL

app.get('/', (_req:Request, res:Response) =>{
    res.send('Howdy desde mi servidor con TS')
});

export default app;