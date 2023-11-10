import {OrderId} from "./value-object/order-id";
import {UserId} from "../value-object/user-id";
import {Price} from "../value-object/price";
import {Order, OrderStatus} from "./entity/order";
import {RestaurantId} from "../value-object/restuarant-id";
import {Address} from "../value-object/address";
import {Product} from "../product/entity/product";
import {ProductId} from "../value-object/product-id";

describe('Order', () => {
    const orderId = new OrderId(1);
    const userId = new UserId(1);
    const dateTime = new Date();
    const totalPrice = new Price(100);
    const status = OrderStatus.Pending;
    const deliveryAddress = new Address('street', 'houseNumber', 'apartmentNumber', 'city', 'country');
    const restaurantId = new RestaurantId(1);
    const quantity = 1
    const products = [new Product(new ProductId(1), 'Product1', new Price(100), 'Description', new RestaurantId(1)),
        new Product(new ProductId(22), 'Product2', new Price(200), 'Description', new RestaurantId(2)),
        new Product(new ProductId(3), 'Product3', new Price(300), 'Description', new RestaurantId(3))]
    let order: Order;

    beforeEach(() => {
        order = Order.create(orderId, userId, dateTime, totalPrice, status, quantity, deliveryAddress, restaurantId,products);
    })

    it('should create an order', () => {
        expect(order.id).toEqual(orderId);
        expect(order.userId).toEqual(userId);
        expect(order.dateTime).toEqual(dateTime);
        expect(order.totalPrice).toEqual(totalPrice);
        expect(order.status).toEqual(status);
        expect(order.quantity).toEqual(quantity);
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

    it('should change status to Delivered', function () {
        const newStatus = OrderStatus.Delivered;
        order.changeStatus(newStatus);
        expect(order.status).toEqual(newStatus);
    })
    it('should change date time', function () {
        const newDateTime = new Date();
        order.changeDateTime(newDateTime);
    });

    it('should change delivery address', function () {
        const newAddress = new Address('street', 'houseNumber', 'apartmentNumber', 'city', 'country');
        order.changeDeliveryAddress(newAddress);
    });
    it('should update products', function () {
        const newProducts = [new Product(new ProductId(1), 'Product1', new Price(100), 'Description', new RestaurantId(1)),
            new Product(new ProductId(22), 'Product2', new Price(200), 'Description', new RestaurantId(2)),
            new Product(new ProductId(3), 'Product3', new Price(300), 'Description', new RestaurantId(3))]
        order.changeProducts(newProducts);
    });
    it('should update quantity', function () {
        const newQuantity = 2;
        order.changeQuantity(newQuantity);
    });
})
