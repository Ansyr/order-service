import {RestaurantRepository} from "../interfaces";
import {DeleteRestaurantCommand} from "./commands";
import {DeleteRestaurantDTO} from "./dto";

export class DeleteRestaurant{
    constructor(
        private RestaurantRepo: RestaurantRepository
    ){}
    handle(command: DeleteRestaurantCommand): DeleteRestaurantDTO{
        this.RestaurantRepo.deleteRestaurant(command.restaurantId)
        return {
            restaurantId: command.restaurantId
        }
    }
}
