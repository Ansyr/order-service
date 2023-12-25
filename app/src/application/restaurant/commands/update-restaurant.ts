import {RestaurantRepository} from "../interfaces";
import {UpdateRestaurantCommand} from "./commands";
import {Address} from "../../../domain/value-object/address";
import {Restaurant} from "../../../domain/restaurant/entity/restaurant";

export class UpdateRestaurant {
    constructor(
        private RestaurantRepo: RestaurantRepository
    ) {}
    async handle(command: UpdateRestaurantCommand) {
        const restaurant = await this.RestaurantRepo.findRestaurant(command.restaurantId)
        if (!restaurant) {
            throw new Error('Restaurant not found')
        }
        if(command.city && command.country && command.street && command.houseNumber) {
            const address = new Address(command.city, command.country, command.street, command.houseNumber, command.apartmentNumber)
            restaurant.changeAddress(address)
        }
        if (command.name) {
            restaurant.changeName(command.name)
        }
        if (command.cuisineType) {
            restaurant.changeCuisineType(command.cuisineType)
        }
        console.log(restaurant)
        this.RestaurantRepo.updateRestaurant(restaurant)
    }
}
