import {CreateProductCommand} from "./commands";
import {ProductId} from "../../../domain/value-object/product-id";
import {Price} from "../../../domain/value-object/price";
import {RestaurantId} from "../../../domain/value-object/restuarant-id";
import {Product} from "../../../domain/product/entity/product";
import {randomUUID} from "crypto";
import {ProductRepo} from "../../../infrastructure/product/postgres/product-repo/product-repo";

export class CreateProduct{
    constructor(
        private productRepo: ProductRepo
    ) {}

    async handle(command: CreateProductCommand) {
        const productId = new ProductId(randomUUID())
        const price = new Price(command.price)
        const restaurantId = new RestaurantId(command.restaurantId)
        const product = Product.create(productId, command.name, price, command.description, restaurantId)
            await this.productRepo.saveProduct(product)
    }
}
