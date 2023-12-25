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

const bodyParser = require('body-parser')
export const startApp = async (
    {
        userService,
        orderService,
        restaurantService
    }: {
        userService: UserService,
        orderService: OrderService,
        restaurantService: RestaurantService

    }) => {
    const app = express()
    app.use(bodyParser())

    await dbConnect()

    const orderHandler = new OrderHandler(orderService)
    const userHandler = new UserHandler(userService)
    const restaurantHandler = new RestaurantHandler(restaurantService)

    const PORT = 5000;
    userRoutes(app, userHandler)
    orderRoutes(app, orderHandler)
    restaurantRoutes(app, restaurantHandler)
    app.listen(PORT, "localhost", () => {
        console.log(`Server started on port`, {PORT})
    });
}
