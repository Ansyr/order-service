import {Express} from "express-serve-static-core";
import {RestaurantHandler} from "./handler";

export const restaurantRoutes = (app: Express, handler: RestaurantHandler) => {
    app.post('/restaurant', handler.createRestaurant.bind(handler))
    app.patch('/restaurant/:restaurantId', handler.updateRestaurant.bind(handler))
    app.delete('/restaurant/:restaurantId', handler.deleteRestaurant.bind(handler))
}
