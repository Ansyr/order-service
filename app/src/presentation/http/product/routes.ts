import {Express} from "express-serve-static-core";
import {ProductHandler} from "./handler";

export const productRoutes = (app: Express, handler: ProductHandler) => {
    app.post('/product', handler.createProduct.bind(handler))
    app.delete('/product/:productId', handler.deleteProduct.bind(handler))
    app.patch('/product/:productId', handler.updateProduct.bind(handler))
}
