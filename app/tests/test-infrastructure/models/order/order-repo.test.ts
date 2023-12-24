import {Order, OrderStatus} from '../../../../src/domain/order/entity/order';
import {OrderRepo} from "../../../../src/infrastructure/order/postgres/repo";
import {Address} from "../../../../src/domain/value-object/address";
import {Amount} from "../../../../src/domain/value-object/amount";
import {Price} from "../../../../src/domain/value-object/price";
import {User} from "../../../../src/domain/user/entity/user";
import {randomUUID} from "crypto";
import {Restaurant} from "../../../../src/domain/restaurant/entity/restaurant";
import {OrderId} from "../../../../src/domain/order/value-object/order-id";
import {destroyTestData, initializeTestData, testDbPool} from "../../fixture/fixtures.test";
import {UserId} from "../../../../src/domain/value-object/user-id";
import {Email} from "../../../../src/domain/user/value-object/email";

import {RestaurantId} from "../../../../src/domain/value-object/restuarant-id";
import {createUserFixture} from "../../fixture/db/create-user-fixture";
import {createRestaurantFixture} from "../../fixture/db/create-restaurant-fixture";
import {createProductFixture} from "../../fixture/db/create-product-fixture";


describe('OrderRepo Integration Tests', () => {
    let orderRepo: OrderRepo;
    let restaurant: Restaurant;
    let user: User
    let order: Order

    beforeAll(async () => {
        await initializeTestData()

        const userId = new UserId(randomUUID())
        const email = new Email('test123123@test');
        user = await createUserFixture(userId, email)

        const restaurantId = new RestaurantId(randomUUID())
        restaurant = await createRestaurantFixture(restaurantId)

        const productId = new RestaurantId(randomUUID())
        const product = await createProductFixture(productId, restaurantId)

        const orderId = new OrderId(randomUUID())
        const dateTime = new Date();
        const totalPrice = new Price(100.00);
        const status = OrderStatus.Created;
        const amount = new Amount(2);
        const deliveryAddress = new Address('street', 'houseNumber', 'apartmentNumber', 'city', 'country');
        order = Order.create(orderId, user.id, dateTime, totalPrice, status, amount, deliveryAddress, restaurant.id, [
            product,
            product
        ])

        orderRepo = new OrderRepo(testDbPool);

    });


    afterAll(async () => {
        await destroyTestData();
    });

    describe('saveOrder', () => {
        it('should save an order to the database', async () => {
            await orderRepo.saveOrder(order);
            const findSavedOrder = await orderRepo.findOrder(order.id.id);
            expect(findSavedOrder).toBeDefined();
            expect(findSavedOrder.id.id).toEqual(order.id.id);
        });
    });

    // describe("findOrder", () => {
    //     it("should return order from database", async () => {
    //         await orderRepo.saveOrder(order);
    //         const findOrder = await orderRepo.findOrder(order.id.id);
    //         if (findOrder) {
    //             findOrder.changeStatus(OrderStatus.Pending);
    //             await orderRepo.updateOrderStatus(findOrder);
    //         } else {
    //             throw new Error("Order not found");
    //         }
    //         expect(findOrder).toBeDefined();
    //     })
    // })
    //
    // describe("updateOrderStatus", () => {
    //     it("should update order status", async () => {
    //         await orderRepo.saveOrder(order);
    //         const findOrder = await orderRepo.findOrder(order.id.id);
    //         if (findOrder) {
    //             findOrder.changeStatus(OrderStatus.Pending);
    //             await orderRepo.updateOrderStatus(findOrder);
    //         } else {
    //             throw new Error("Order not found");
    //         }
    //     });
    // })
    // describe('deleteOrder', () => {
    //     it('should delete an order from the database', async () => {
    //
    //         await orderRepo.saveOrder(order);
    //         await orderRepo.deleteOrder(order.id.id);
    //         const res = await testDbPool.query('SELECT * FROM "order".order WHERE order_id = $1', [order.id]);
    //
    //
    //         expect(res.rows.length).toBe(0);
    //     });
    // });
});
