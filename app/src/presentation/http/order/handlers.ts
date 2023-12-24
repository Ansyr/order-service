import {CreateOrder} from "../../../application/order/commands/create-order";
import {CreateOrderCommand} from "../../../application/order/commands/commands";
import {Request, Response} from "express";
export class OrderHandler {
    constructor(
        private createOrder5: CreateOrder
    ) {}

    async createOrder(req: Request, res: Response) {

        const command : CreateOrderCommand = {
            userId: req.body.userId,
            dateTime: req.body.dateTime,
            totalPrice: req.body.totalPrice,
            status: req.body.status,
            amount: req.body.amount,
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            apartmentNumber: req.body.apartmentNumber,
            city: req.body.city,
            country: req.body.country,
            restaurantId: req.body.restaurantId,
            products: req.body.products
        }

        await this.createOrder5.handle(command)
        res.status(201).send()
    }
}
