import express from "express";
import {userRoutes} from "./user/routes";
import {UserHandler} from "./user/handlers";
import {CreateUser} from "../../application/user/comands/create-user-comand";
import {dbConnect} from "../../../pkg/postgres/db-connect";
import {CreateOrder} from "../../application/order/commands/create-order";
import {OrderHandler} from "./order/handlers";
import {orderRoutes} from "./order/routes";

const bodyParser = require('body-parser')
export const startApp = async (createUser: CreateUser,createOrder: CreateOrder) => {
    const app = express()
    app.use(bodyParser())

    await dbConnect()

    const orderHandler = new OrderHandler(createOrder)
    const userHandler = new UserHandler(createUser)


    const PORT = 5000;
    userRoutes(app, userHandler)
    orderRoutes(app, orderHandler)
    app.listen(PORT,"localhost", () => {
        console.log(`Server started on port`,{PORT})
    });
}
