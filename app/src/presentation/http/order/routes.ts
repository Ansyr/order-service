import {OrderHandler} from "./handlers";
import {Express} from "express-serve-static-core";

export const orderRoutes = (app: Express, handler: OrderHandler) => {
    app.post('/order', handler.createOrder.bind(handler))
}
