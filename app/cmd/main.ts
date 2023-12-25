import {startApp} from "../src/presentation/http/http";
import {CreateUser} from "../src/application/user/comands/create-user-comand";
import {UserRepo} from "../src/infrastructure/user/postgres/repo";
import {pool} from "../pkg/postgres/pool";
import {CreateOrder} from "../src/application/order/commands/create-order";
import {OrderRepo} from "../src/infrastructure/order/postgres/order-repo/order-repo";
import {OrderProductRepo} from "../src/infrastructure/order/postgres/order-product-repo/order-product-repo";
import {RestaurantRepo} from "../src/infrastructure/restaurant/postgres/restaurant-repo/restaurant-repo";
import {CreateRestaurant} from "../src/application/restaurant/commands/create-restaurant";
import {UpdateRestaurant} from "../src/application/restaurant/commands/update-restaurant";
import {DeleteRestaurant} from "../src/application/restaurant/commands/delete-restaurant";
import {UpdateOrderStatus} from "../src/application/order/commands/update-order-status";
import {DeleteOrder} from "../src/application/order/commands/delete-order";
import {DeleteUser} from "../src/application/user/comands/delete-user-comand";
import {UserService} from "../src/application/user/service/user-service";
import {OrderService} from "../src/application/order/service/order-service";
import {RestaurantService} from "../src/application/restaurant/service/restaurant-service";

require('dotenv').config()

async function main() {
    const userRepo = new UserRepo(pool)
    const userService = new UserService(userRepo)

    const orderRepo = new OrderRepo(pool)
    const orderProductRepo = new OrderProductRepo(pool)
    const orderService = new OrderService(orderRepo, orderProductRepo)

    const restaurantRepo = new RestaurantRepo(pool)
    const restaurantService = new RestaurantService(restaurantRepo)

    await startApp({
        userService,
        orderService,
        restaurantService
    })
}

main()

