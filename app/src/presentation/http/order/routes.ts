import {OrderHandler} from "./handlers";
import {Express} from "express-serve-static-core";

export const orderRoutes = (app: Express, handler: OrderHandler) => {
    app.post('/order', handler.createOrder.bind(handler))
    app.patch('/order/:orderId', handler.updateOrderStatus.bind(handler))
    app.delete('/order/:orderId', handler.deleteOrder.bind(handler))
}
