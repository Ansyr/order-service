import {Restaurant} from "../../domain/restaurant/entity/restaurant";
import {UUID} from "crypto";

export interface RestaurantRepository {
    saveRestaurant(restaurant: Restaurant): void
    findRestaurant(id: UUID): Restaurant
    updateRestaurant(restaurant: Restaurant): void
    deleteRestaurant(id: UUID): void
}
