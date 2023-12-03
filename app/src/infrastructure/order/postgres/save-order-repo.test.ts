import Pool from "pg-pool";
import { Order, OrderStatus } from '../../../domain/order/entity/order';
import { after, before } from "node:test";
import { randomUUID } from "crypto";
import { OrderRepo } from "./repo";
import { RestaurantId } from "../../../domain/value-object/restuarant-id";
import { Address } from "../../../domain/value-object/address";
import { Amount } from "../../../domain/value-object/amount";
import { Price } from "../../../domain/value-object/price";
import { UserId } from "../../../domain/value-object/user-id";
import { OrderId } from "../../../domain/order/value-object/order-id";


describe('OrderRepo Integration Tests', () => {
    let pool: Pool;
    let orderRepo = new OrderRepo(pool);

    beforeAll(async () => {

        pool = new Pool({
            user: 'testpostgres',
            password: 'testroot',
            host: 'localhost',
            port: 12346,
            database: 'order_test',
            max: 20,
            idleTimeoutMillis: 1000,
            connectionTimeoutMillis: 1000,
        });

        await pool.connect()
        orderRepo = new OrderRepo(pool);
    });

    after(async () => {
        await pool.end();
    });

    describe('saveOrder', () => {
        it('should save an order to the database', async () => {
            const orderId = new OrderId(randomUUID());
            const userId = new UserId(randomUUID());
            const dateTime = new Date();
            const totalPrice = new Price(100.00);
            const status = OrderStatus.Created;
            const amount = new Amount(2);
            const deliveryAddress = new Address('street', 'houseNumber', 'apartmentNumber', 'city', 'country');
            const restaurantId = new RestaurantId(randomUUID());
            const order = Order.create(orderId, userId, dateTime, totalPrice, status, amount, deliveryAddress, restaurantId, [])
            // Saving the order
            await orderRepo.saveOrder(order);

            // Query the database directly to verify that the order was saved
            const res = await pool.query('SELECT * FROM "order".order WHERE order_id = $1', [order.id]);


            expect(res.rowCount).to.equal(1);
            expect(res.rows[0].user_id).to.equal(order.userId);

        });
    });


});
