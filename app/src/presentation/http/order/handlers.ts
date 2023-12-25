import {CreateOrder} from "../../../application/order/commands/create-order";
import {
    CreateOrderCommand,
    DeleteOrderCommand,
    UpdateOrderStatusCommand
} from "../../../application/order/commands/commands";
import {Request, Response} from "express";
import {UpdateOrderStatus} from "../../../application/order/commands/update-order-status";
import {DeleteOrder} from "../../../application/order/commands/delete-order";
import {OrderService} from "../../../application/order/service/order-service";
export class OrderHandler {
    constructor(
        private orderService: OrderService
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
        await this.orderService.createOrder.handle(command)
        res.status(201).send()
    }

    async updateOrderStatus(req: Request, res: Response) {
        const command: UpdateOrderStatusCommand = {
            orderId: req.params.orderId,
            status: req.body.status
        }
        await this.orderService.updateOrderStatus.handle(command)
        res.status(200).send()
    }


    async deleteOrder(req: Request, res: Response) {
        const command: DeleteOrderCommand = {
            orderId: req.params.orderId
        }
        await this.orderService.deleteOrder.handle(command)
        res.status(200).send()
    }
}
