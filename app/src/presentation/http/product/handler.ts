import {ProductService} from "../../../application/product/service/product-service";
import {Request, Response} from "express";
import {
    CreateProductCommand,
    DeleteProductCommand,
    UpdateProductCommand
} from "../../../application/product/commands/commands";

export class ProductHandler{
    constructor(
        private productService: ProductService
    ){}

    async createProduct (req: Request, res: Response) {
        const command: CreateProductCommand = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            restaurantId: req.body.restaurantId,
        }
        const result = await this.productService.createProduct.handle(command)
        res.status(201).send(result)
    }


    async deleteProduct (req: Request, res: Response) {
        const command: DeleteProductCommand = {
            productId: req.params.productId
        }
        const result = await this.productService.deleteProduct.handle(command)
        res.status(201).send(result)
    }

    async updateProduct (req: Request, res: Response) {
        const command: UpdateProductCommand = {
            productId: req.params.productId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            restaurantId: req.body.restaurantId,
        }
        const result = await this.productService.updateProduct.handle(command)
        res.status(201).send(result)
    }
}
