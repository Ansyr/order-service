import {OrderRepository} from "../interfaces";
import {DeleteOrderCommand} from "./commands";
import {DeleteOrderDTO} from "./dto";


export class DeleteOrder{
    constructor(
        private orderRepo: OrderRepository
    ) {}

    handle(command: DeleteOrderCommand): DeleteOrderDTO {
        this.orderRepo.deleteOrder(command.OrderId)
        return {
            orderId: command.OrderId
        }
    }
}
