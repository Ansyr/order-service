import Pool from "pg-pool";
import { Order, OrderStatus } from '../../../domain/order/entity/order';
import { after } from "node:test";
import { OrderRepo } from "./repo";
import { RestaurantId } from "../../../domain/value-object/restuarant-id";
import { Address } from "../../../domain/value-object/address";
import { Amount } from "../../../domain/value-object/amount";
import { Price } from "../../../domain/value-object/price";

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
            const dateTime = new Date();
            const totalPrice = new Price(100.00);
            const status = OrderStatus.Created;
            const amount = new Amount(2);
            const deliveryAddress = new Address('street', 'houseNumber', 'apartmentNumber', 'city', 'country');
            const restaurantId = new RestaurantId(1);
            const order = Order.create(1, 1, dateTime, totalPrice, status, 2, deliveryAddress, 1, [
                {
                    id: 1,
                    price: 30,
                },
                {
                    id: 1,
                    price: 30
                }
            ])
            await orderRepo.saveOrder(order);

            const res = await pool.query('SELECT * FROM "order".order WHERE order_id = $1', [order.id]);

            // expect(res).toBe(order.userId);
        });
    });

    describe("findOrder",() => {
        it("should return order from database", async () => {
            const order = await orderRepo.findOrder(15);
            expect(order).toBeDefined();
        })
    })

    describe("updateOrderStatus",() => {
        it("should update order status", async () => {
            const order = await orderRepo.findOrder(15);
            order?.changeStatus(OrderStatus.Pending);
            await orderRepo.updateOrderStatus(order);
        })
    })
    describe('deleteOrder', () => {
        it('should delete an order from the database', async () => {

            const orderToBeDeleted = Order.create(
                1,
                1,
                new Date(),
                new Price(100.00),
                OrderStatus.Created,
                2,
                new Address('street', 'houseNumber', 'apartmentNumber', 'city', 'country'),
                1,
                [
                    {
                        id: 1,
                        price: 30,
                    },
                    {
                        id: 1,
                        price: 30
                    }
                ]
            );
            await orderRepo.saveOrder(orderToBeDeleted);


            await orderRepo.deleteOrder(orderToBeDeleted.id);


            const res = await pool.query('SELECT * FROM "order".order WHERE order_id = $1', [orderToBeDeleted.id]);


            expect(res.rows.length).toBe(0);
        });
    });
});
