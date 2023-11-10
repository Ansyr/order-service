import {DeliveryId} from "../value-object/dilivery-id";
import {OrderId} from "../../order/value-object/order-id";
import {User} from "../../user/entity/user";

export enum DeliveryStatus {
    Created= "Создан",
    Pending = "В обработке",
    Rejected = "Отклонен",
    Delivered = "Доставлен",
}

export class Delivery{
    private constructor(
        public id:DeliveryId,
        public orderId: OrderId,
        public courier: User,
        public deliveryStatus: DeliveryStatus) {}

    static create(deliveryId: DeliveryId, orderId: OrderId, courier: User, deliveryStatus: DeliveryStatus){
        return new Delivery(deliveryId, orderId, courier, deliveryStatus);
    }


    changeDeliveryStatus(newDeliveryStatus: DeliveryStatus){
        this.deliveryStatus = newDeliveryStatus
    }
}
