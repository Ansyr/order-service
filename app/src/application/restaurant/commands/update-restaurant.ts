import {RestaurantRepository} from "../interfaces";
import {UpdateRestaurantCommand} from "./commands";
import {Address} from "../../../domain/value-object/address";

export class UpdateRestaurant {
    constructor(
        private RestaurantRepo: RestaurantRepository
    ) {}
    handle(command: UpdateRestaurantCommand) {
        const restaurant = this.RestaurantRepo.findRestaurant(command.restaurantId)
        const address = new Address(command.city, command.country, command.street, command.houseNumber, command.apartmentNumber)
        restaurant.changeAddress(address)
        restaurant.changeName(command.name)
        restaurant.changeCuisineType(command.cuisineType)
        this.RestaurantRepo.updateRestaurant(restaurant)
    }
}
