import {ProductId} from "../../value-object/product-id";
import {Price} from "../../value-object/price";
import {RestaurantId} from "../../value-object/restuarant-id";


export class Product{
    private constructor(
        public id: ProductId,
        public name: string,
        public price: Price,
        public description: string,
        public restaurantId: RestaurantId
    ){}
    static create(id: ProductId, name: string, price: Price, description: string, restaurantId: RestaurantId): Product{
        return new Product(id, name, price, description, restaurantId);
    }

    updateName(newName: string): void{
        this.name = newName;
    }

    updatePrice(newPrice: Price): void{
        if (newPrice.isGreaterThan(100000)){
            throw new Error('Цена продукта не может быть больше 1000000')
        }
        this.price = newPrice
    }
    updateRestaurantId(newRestaurantId: RestaurantId): void{
        this.restaurantId = newRestaurantId
    }
    updateDescription(newDescription: string): void{
        this.description = newDescription
    }
}
