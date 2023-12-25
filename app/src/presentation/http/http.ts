import express from "express";
import {userRoutes} from "./user/routes";
import {UserHandler} from "./user/handlers";
import {CreateUser} from "../../application/user/comands/create-user-comand";
import {dbConnect} from "../../../pkg/postgres/db-connect";
import {CreateOrder} from "../../application/order/commands/create-order";
import {OrderHandler} from "./order/handlers";
import {orderRoutes} from "./order/routes";
import {CreateRestaurant} from "../../application/restaurant/commands/create-restaurant";
import {RestaurantHandler} from "./restaurant/handler";
import {restaurantRoutes} from "./restaurant/routes";
import {UpdateRestaurant} from "../../application/restaurant/commands/update-restaurant";
import {DeleteRestaurant} from "../../application/restaurant/commands/delete-restaurant";
import {UpdateOrderStatus} from "../../application/order/commands/update-order-status";
import {DeleteOrder} from "../../application/order/commands/delete-order";
import {DeleteUser} from "../../application/user/comands/delete-user-comand";
import {UserService} from "../../application/user/service/user-service";
import {OrderService} from "../../application/order/service/order-service";

const bodyParser = require('body-parser')
export const startApp = async (
    {
        userService,
        orderService,
        createRestaurant,
        updateRestaurant,
        deleteRestaurant,
    }: {
        userService: UserService,
        orderService: OrderService,
        createRestaurant: CreateRestaurant,
        updateRestaurant: UpdateRestaurant,
        deleteRestaurant: DeleteRestaurant,

    }) => {
    const app = express()
    app.use(bodyParser())

    await dbConnect()

    const orderHandler = new OrderHandler(orderService)
    const userHandler = new UserHandler(userService)
    const restaurantHandler = new RestaurantHandler(createRestaurant, updateRestaurant, deleteRestaurant)

    const PORT = 5000;
    userRoutes(app, userHandler)
    orderRoutes(app, orderHandler)
    restaurantRoutes(app, restaurantHandler)
    app.listen(PORT, "localhost", () => {
        console.log(`Server started on port`, {PORT})
    });
}
