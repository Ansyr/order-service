import {RestaurantId} from "../../value-object/restuarant-id";
import {Address} from "../../value-object/address";



export class Restaurant {
    private constructor(
        public id: RestaurantId,
        public name: string,
        public address: Address
    ) {
    }

    static create(id: RestaurantId, name: string, address: Address) {
        return new Restaurant(id, name, address);
    }

    changeName(newName: string) {
        this.name = newName
    }

    changeAddress(newAddress: Address) {
        this.address = newAddress
    }
}
