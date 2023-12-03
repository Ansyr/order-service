import {Price} from "../../../domain/value-object/price";
import {Order, OrderStatus} from "../../../domain/order/entity/order";
import {Amount} from "../../../domain/value-object/amount";
import {Address} from "../../../domain/value-object/address";
import {OrderId} from "../../../domain/order/value-object/order-id";
import {randomUUID} from "crypto";
import {OrderProductRepository, OrderRepository} from "../interfaces";
import {CreateOrderCommand} from "./commands";
import {CreatedOrderDTO} from "./dto";
import {UserId} from "../../../domain/value-object/user-id";


class CreateOrder {
    constructor(
        private orderRepo: OrderRepository,
        private orderProductRepo: OrderProductRepository,
    ) {
    }

    handle(command: CreateOrderCommand): CreatedOrderDTO {
        const amount = new Amount(command.amount);
        const price = new Price(command.totalPrice);
        const address = new Address(command.country, command.city, command.street, command.houseNumber, command.apartmentNumber);
        const products = this.orderProductRepo.getProducts(command.products)
        const orderStatus = OrderStatus.Created
        const createdTime = new Date()

        const order = Order.create(
            new OrderId(randomUUID()),
            new UserId(command.userId),
            createdTime,
            price,
            orderStatus,
            amount,
            address,
            new OrderId(command.restaurantId),
            products
        )
        this.orderRepo.saveOrder(order)
        return {
            orderId: order.getUUID()
        }
    }
}
