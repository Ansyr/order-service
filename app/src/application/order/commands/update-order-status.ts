import {OrderRepository} from "../interfaces";
import {UpdateOrderStatusDTO} from "./dto";
import {UpdateOrderStatusCommand} from "./commands";

export class UpdateOrderStatus {
    constructor(
        private orderRepo: OrderRepository
    ){}
    handle(command: UpdateOrderStatusCommand): UpdateOrderStatusDTO {
        const order = this.orderRepo.findOrder(command.orderId)
        order.changeStatus(command.status)
        this.orderRepo.updateOrderStatus(order)
        return {
            orderId: command.orderId,
        }
    }
}
