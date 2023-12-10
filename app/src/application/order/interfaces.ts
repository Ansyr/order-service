import {UUID} from "crypto";
import {Product} from "../../domain/product/entity/product";
import {Order, OrderStatus} from "../../domain/order/entity/order";
import {UserId} from "../../domain/value-object/user-id";
import {RestaurantId} from "../../domain/value-object/restuarant-id";

export interface OrderRepository {
    saveOrder(order: Order): void
    deleteOrder(id: UUID): void
    updateOrderStatus(order: Order): void
    findOrder(id: UUID): Promise<Order>
}


export interface OrderProductRepository{
    getProducts(id: UUID[]): Product[]
}

