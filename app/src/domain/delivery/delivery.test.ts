import {Roles, User} from "../user/entity/user";
import {PhoneNumber} from "../user/value-object/phone-number";
import {UserId} from "../value-object/user-id";
import {OrderId} from "../order/value-object/order-id";
import {DeliveryId} from "./value-object/dilivery-id";
import {Address} from "../value-object/address";
import {FullName} from "../user/value-object/full-name";
import {Email} from "../user/value-object/email";
import {Password} from "../user/value-object/password";
import {Delivery, DeliveryStatus} from "./entity/delivery";
import {randomUUID} from "crypto";

describe('Delivery', () => {
    const deliveryId = new DeliveryId(1);
    const orderId = new OrderId(randomUUID());
    const address = new Address('street', 'houseNumber', 'apartmentNumber', 'city', 'country');
    const fullName = new FullName("name", "surname", "lastname");
    const email = new Email("email@mail.ru");
    const password = new Password("password");
    const userId = new UserId(randomUUID())
    const courier = new User(userId, fullName,email, password, address, new PhoneNumber('1234567890'), Roles.COURIER);
    const deliveryStatus = DeliveryStatus.Pending;
    let delivery: Delivery;

    beforeEach(() => {
        delivery = Delivery.create(deliveryId, orderId, courier, deliveryStatus);
    })
    it('should create a delivery', () => {
        expect(deliveryId).toEqual(delivery.id);
        expect(orderId).toEqual(delivery.orderId);
        expect(courier).toEqual(delivery.courier);
        expect(deliveryStatus).toEqual(delivery.deliveryStatus);
    });
    it('should change delivery status to delivered',  () => {
        const newStatus = DeliveryStatus.Delivered;
        delivery.changeDeliveryStatus(newStatus);
        expect(delivery.deliveryStatus).toEqual(newStatus);
    });

    it('should change delivery status to rejected',  () => {
        const newStatus = DeliveryStatus.Rejected;
        delivery.changeDeliveryStatus(newStatus);
        expect(delivery.deliveryStatus).toEqual(newStatus);
    });
})
