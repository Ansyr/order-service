import {Restaurant} from "../../domain/restaurant/entity/restaurant";


export interface RestaurantRepository {
    saveRestaurant(restaurant: Restaurant): void
    findRestaurant(id: string): Promise<Restaurant | null>
    updateRestaurant(restaurant: Restaurant): void
    deleteRestaurant(id: string): void
}
