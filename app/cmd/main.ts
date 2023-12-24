import {startApp} from "../src/presentation/http/http";
import {CreateUser} from "../src/application/user/comands/create-user-comand";
import {UserRepo} from "../src/infrastructure/user/postgres/repo";
import {pool} from "../pkg/postgres/pool";
import {CreateOrder} from "../src/application/order/commands/create-order";
import {OrderRepo} from "../src/infrastructure/order/postgres/order-repo/order-repo";
import {OrderProductRepo} from "../src/infrastructure/order/postgres/order-product-repo/order-product-repo";
require('dotenv').config()
async function main() {
    const userRepo = new UserRepo(pool)
    const createUser = new CreateUser(userRepo)

    const orderRepo = new OrderRepo(pool)
    const orderProductRepo = new OrderProductRepo(pool)
    const createOrder = new CreateOrder(orderRepo,orderProductRepo)

    await startApp(createUser,createOrder)
}

main()

