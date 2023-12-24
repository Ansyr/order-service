import {RestaurantId} from "../../value-object/restuarant-id";
import {Address} from "../../value-object/address";



export class Restaurant {
    private constructor(
        public id: RestaurantId,
        public name: string,
        public address: Address,
        public cuisineType?: string
    ) {
    }

    static create(restaurantId: RestaurantId, name: string, address: Address, cuisineType?: string) {
        return new Restaurant(restaurantId, name, address, cuisineType);
    }

    changeName(newName: string) {
        this.name = newName
    }

    changeAddress(newAddress: Address) {
        this.address = newAddress
    }
    changeCuisineType(newCuisineType: string) {
        this.cuisineType = newCuisineType
    }
}
