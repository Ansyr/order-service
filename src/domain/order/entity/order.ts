import {OrderId} from "../value-object/order-id";
import {UserId} from "../../value-object/user-id";
import {Price} from "../../value-object/price";
import {Address} from "../../value-object/address";
import {RestaurantId} from "../../value-object/restuarant-id";
import {Product} from "../../product/entity/product";

export enum OrderStatus {
    Created= "Создан",
    Pending = "В обработке",
    Rejected = "Отклонен",
    Delivered = "Доставлен",
}

export class Order{
    private constructor(
        public id: OrderId,
        public userId: UserId,
        public dateTime : Date,
        public totalPrice: Price,
        public status: OrderStatus,
        public quantity: number,
        public deliveryAddress: Address,
        public restaurantId: RestaurantId,
        public products: Product[]
    ){}

    static create(orderId: OrderId, userId: UserId, dateTime: Date, totalPrice: Price, status: OrderStatus, quantity: number, deliveryAddress: Address, restaurantId: RestaurantId, products: Product[]): Order{
        return new Order(orderId, userId, dateTime, totalPrice, status,quantity, deliveryAddress, restaurantId, products);
    }

    changeStatus(newStatus: OrderStatus): void{
        this.status = newStatus;
    }

    changeDateTime(newDateTime: Date): void{
        this.dateTime = newDateTime
    }

    changeDeliveryAddress(newAddress: Address): void{
        this.deliveryAddress = newAddress
    }
    changeProducts(newProducts: Product[]): void{
        this.products = newProducts
    }

    changeQuantity(newQuantity: number): void{
        this.quantity = newQuantity
    }
}
