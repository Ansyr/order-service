import {DeleteRestaurant} from "../commands/delete-restaurant";
import {UpdateRestaurant} from "../commands/update-restaurant";
import {CreateRestaurant} from "../commands/create-restaurant";
import {RestaurantRepo} from "../../../infrastructure/restaurant/postgres/restaurant-repo/restaurant-repo";

export class RestaurantService{
    private readonly restaurantRepo: RestaurantRepo
    public readonly createRestaurant: CreateRestaurant
    public readonly updateRestaurant: UpdateRestaurant
    public readonly deleteRestaurant: DeleteRestaurant
    constructor(restaurantRepo: RestaurantRepo) {
        this.restaurantRepo = restaurantRepo
        this.createRestaurant = new CreateRestaurant(this.restaurantRepo)
        this.updateRestaurant = new UpdateRestaurant(this.restaurantRepo)
        this.deleteRestaurant = new DeleteRestaurant(this.restaurantRepo)
    }
}
