import {ProductRepo} from "../../../infrastructure/product/postgres/product-repo/product-repo";
import {DeleteProductCommand} from "./commands";


export class DeleteProduct {
    constructor(
        public readonly productRepo: ProductRepo
    ) {}

    async handle(command: DeleteProductCommand) {
        const product = await this.productRepo.findProduct(command.productId)
        if (!product) {
            throw new Error('Product not found')
        }
        await this.productRepo.deleteProduct(command.productId)
    }
}
