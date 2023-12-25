import {ProductRepo} from "../../../infrastructure/product/postgres/product-repo/product-repo";
import {UpdateProductCommand} from "./commands";
import {Price} from "../../../domain/value-object/price";


export class UpdateProduct{
    constructor(
        private productRepo: ProductRepo
    ){}
    async handle(command: UpdateProductCommand){
        const product = await this.productRepo.findProduct(command.productId)
        if (!product) {
            throw new Error('Product not found')
        }
        if(command.name){
            product.updateName(command.name)
        }
        if(command.price){
            const price = new Price(command.price)
            product.updatePrice(price)
        }
        if(command.description){
            product.updateDescription(command.description)
        }
        await this.productRepo.updateProduct(product)
    }
}
