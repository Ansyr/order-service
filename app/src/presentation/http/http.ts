import express from "express";
import {userRoutes} from "./user/routes";
import {UserHandler} from "./user/handlers";
import {dbConnect} from "../../../pkg/postgres/db-connect";
import {OrderHandler} from "./order/handlers";
import {orderRoutes} from "./order/routes";
import {RestaurantHandler} from "./restaurant/handler";
import {restaurantRoutes} from "./restaurant/routes";
import {UserService} from "../../application/user/service/user-service";
import {OrderService} from "../../application/order/service/order-service";
import {RestaurantService} from "../../application/restaurant/service/restaurant-service";
import {ProductService} from "../../application/product/service/product-service";
import {productRoutes} from "./product/routes";
import {ProductHandler} from "./product/handler";

const bodyParser = require('body-parser')
export const startApp = async (
    {
        userService,
        orderService,
        restaurantService,
        productService
    }: {
        userService: UserService,
        orderService: OrderService,
        restaurantService: RestaurantService,
        productService: ProductService

    }) => {
    const app = express()
    app.use(bodyParser())

    await dbConnect()

    const orderHandler = new OrderHandler(orderService)
    const userHandler = new UserHandler(userService)
    const restaurantHandler = new RestaurantHandler(restaurantService)

    const productHandler = new ProductHandler(productService)


    const PORT = 5000;
    userRoutes(app, userHandler)
    orderRoutes(app, orderHandler)
    restaurantRoutes(app, restaurantHandler)
    productRoutes(app,productHandler)
    app.listen(PORT, "localhost", () => {
        console.log(`Server started on port`, {PORT})
    });
}
