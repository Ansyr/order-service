import {UUID} from "crypto";
import {OrderStatus} from "../../../domain/order/entity/order";

export type CreateOrderCommand = {
    userId: UUID;
    dateTime: Date;
    totalPrice: number;
    status: OrderStatus;
    amount: number;
    street: string
    houseNumber: string
    apartmentNumber: string
    city: string
    country: string
    restaurantId: UUID;
    products: UUID[];
}


export type DeleteOrderCommand = {
    orderId: string
}


export type UpdateOrderStatusCommand = {
    orderId: string;
    status: OrderStatus;
}


