import {OrderRepository} from "../interfaces";
import {UpdateOrderStatusDTO} from "./dto";
import {UpdateOrderStatusCommand} from "./commands";

export class UpdateOrderStatus {
    constructor(
        private orderRepo: OrderRepository
    ){}
    async handle(command: UpdateOrderStatusCommand): Promise<UpdateOrderStatusDTO> {
        const order = await this.orderRepo.findOrder(command.orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        order.changeStatus(command.status);
        await this.orderRepo.updateOrderStatus(order);
        return {
            orderId: command.orderId,
        };
    }

}
