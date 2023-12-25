import {UUID} from "crypto";
import {Order} from "../../domain/order/entity/order";
import {Product} from "../../domain/product/entity/product";


export interface OrderRepository {
    saveOrder(order: Order): void
    deleteOrder(id: string): void
    updateOrderStatus(order: Order): void
    findOrder(id: string): Promise<Order | null>
}


export interface OrderProductRepository{
    getProducts(id: UUID[]): Promise<Product[]>
}

