import { Express } from "express-serve-static-core";
import {UserHandler} from "./handlers";

export const userRoutes =  (app: Express,handler : UserHandler) => {
    app.post('/user',handler.createUser.bind(handler))
    app.delete('/user/:id',handler.deleteUser.bind(handler))
}
