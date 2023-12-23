import {OrderId} from "../../../../src/domain/order/value-object/order-id";
import {UserId} from "../../../../src/domain/value-object/user-id";
import {Price} from "../../../../src/domain/value-object/price";
import {Order, OrderStatus} from "../../../../src/domain/order/entity/order";
import {RestaurantId} from "../../../../src/domain/value-object/restuarant-id";
import {Address} from "../../../../src/domain/value-object/address";
import {Product} from "../../../../src/domain/product/entity/product";
import {ProductId} from "../../../../src/domain/value-object/product-id";
import {Amount} from "../../../../src/domain/value-object/amount";
import {randomUUID} from "crypto";

describe('Order', () => {
    const orderId = new OrderId(1);
    const userId = new UserId(1);
    const dateTime = new Date();
    const totalPrice = new Price(100);
    const status = OrderStatus.Pending;
    const deliveryAddress = new Address('street', 'houseNumber', 'apartmentNumber', 'city', 'country');
    const restaurantId = new RestaurantId(randomUUID());
    const amount = new Amount(1)
    const products = [new Product(new ProductId(randomUUID()), 'Product1', new Price(100), 'Description', new RestaurantId(randomUUID())),
        new Product(new ProductId(randomUUID()), 'Product2', new Price(200), 'Description', new RestaurantId(randomUUID())),
        new Product(new ProductId(randomUUID()), 'Product3', new Price(300), 'Description', new RestaurantId(randomUUID()))]
    let order: Order;

    beforeEach(() => {
        order = Order.create(orderId, userId, dateTime, totalPrice, status, amount, deliveryAddress, restaurantId,products);
    })

    it('should create an order', () => {
        expect(order.id).toEqual(orderId);
        expect(order.userId).toEqual(userId);
        expect(order.dateTime).toEqual(dateTime);
        expect(order.totalPrice).toEqual(totalPrice);
        expect(order.status).toEqual(status);
        expect(order.amount).toEqual(amount);
        expect(order.deliveryAddress).toEqual(deliveryAddress);
        expect(order.restaurantId).toEqual(restaurantId);
        expect(order.products).toEqual(products);
    })
    it('should change status to Created', function () {
        const newStatus = OrderStatus.Created;
        order.changeStatus(newStatus);
    });

    it('should change status to Rejected', function () {
        const newStatus = OrderStatus.Rejected;
        order.changeStatus(newStatus);
        expect(order.status).toEqual(newStatus);
    });

    it('should change status to Payment', function () {
        const newStatus = OrderStatus.Payment;
        order.changeStatus(newStatus);
        expect(order.status).toEqual(newStatus);
    })
    it('should update quantity', function () {
        const newAmount = new Amount(1);
        order.changeAmount(newAmount);
    });
})
