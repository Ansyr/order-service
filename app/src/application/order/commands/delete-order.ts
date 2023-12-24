import {OrderRepository} from "../interfaces";
import {DeleteOrderCommand} from "./commands";
import {DeleteOrderDTO} from "./dto";


export class DeleteOrder{
    constructor(
        private orderRepo: OrderRepository
    ) {}

     async handle(command: DeleteOrderCommand): Promise<DeleteOrderDTO> {
        await this.orderRepo.deleteOrder(command.OrderId)
        return {
            orderId: command.OrderId
        }
    }
}
