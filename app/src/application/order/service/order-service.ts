import {UpdateOrderStatus} from "../commands/update-order-status";
import {CreateOrder} from "../commands/create-order";
import {DeleteOrder} from "../commands/delete-order";
import {OrderRepo} from "../../../infrastructure/order/postgres/order-repo/order-repo";
import {OrderProductRepo} from "../../../infrastructure/order/postgres/order-product-repo/order-product-repo";

export class OrderService {
    private readonly orderRepo: OrderRepo
    private readonly orderProductRepo: OrderProductRepo
    public readonly createOrder: CreateOrder
    public readonly updateOrderStatus: UpdateOrderStatus
    public readonly deleteOrder: DeleteOrder
    constructor(orderRepo: OrderRepo, orderProductRepo: OrderProductRepo) {
        this.orderRepo = orderRepo
        this.orderProductRepo = orderProductRepo
        this.createOrder = new CreateOrder(this.orderRepo, this.orderProductRepo)
        this.updateOrderStatus = new UpdateOrderStatus(this.orderRepo)
        this.deleteOrder = new DeleteOrder(this.orderRepo)
    }
}
