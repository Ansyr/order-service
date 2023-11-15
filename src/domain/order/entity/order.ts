import {OrderId} from "../value-object/order-id";
import {UserId} from "../../value-object/user-id";
import {Price} from "../../value-object/price";
import {Address} from "../../value-object/address";
import {RestaurantId} from "../../value-object/restuarant-id";
import {Product} from "../../product/entity/product";
import {Amount} from "../../value-object/amount";
import {UUID} from "crypto";

export enum OrderStatus {
    Created= "Создан",
    Pending = "В обработке",
    Rejected = "Отклонен",
    Payment = "Оплачен",
}

export class Order{
    private constructor(
        public id: OrderId,
        public userId: UserId,
        public dateTime : Date,
        public totalPrice: Price,
        public status: OrderStatus,
        public amount: Amount,
        public deliveryAddress: Address,
        public restaurantId: RestaurantId,
        public products: Product[]
    ){}

    static create(orderId: OrderId, userId: UserId, dateTime: Date, totalPrice: Price, status: OrderStatus, amount: Amount, deliveryAddress: Address, restaurantId: RestaurantId, products: Product[]): Order{
        return new Order(orderId, userId, dateTime, totalPrice, status,amount, deliveryAddress, restaurantId, products);
    }

    changeStatus(newStatus: OrderStatus): void{
        this.status = newStatus;
    }


    changeAmount(newAmount: Amount): void{
        this.amount = newAmount
    }

    getUUID(): UUID{
        return this.id.id
    }
}
