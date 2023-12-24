import {RestaurantRepository} from "../interfaces";
import {CreateRestaurantCommand} from "./commands";
import {Restaurant} from "../../../domain/restaurant/entity/restaurant";
import {RestaurantId} from "../../../domain/value-object/restuarant-id";
import {Address} from "../../../domain/value-object/address";
import {CreateRestaurantDTO} from "./dto";

export class CreateRestaurant{
    constructor(
        private restaurantRepo: RestaurantRepository
    ) {}
    handle(command: CreateRestaurantCommand): CreateRestaurantDTO {
        const restaurantId = new RestaurantId(command.restaurantId)
        const address = new Address(command.country, command.city, command.street, command.houseNumber,command.apartmentNumber)
        const restaurant = Restaurant.create(restaurantId, command.name, address, command.cuisineType)
        this.restaurantRepo.saveRestaurant(restaurant)
        return {
            restaurantId: restaurant.id.id
        }
    }
}
