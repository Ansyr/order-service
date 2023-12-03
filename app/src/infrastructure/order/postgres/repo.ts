import { OrderRepository } from "../../../application/order/interfaces";
import { Order } from "../../../domain/order/entity/order";
import { UUID } from "crypto";
import Pool from "pg-pool";


export class OrderRepo implements OrderRepository {
    private pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async saveOrder(order: Order) {

        console.log(this.pool)
        const client = await this.pool.connect();


        try {
            await client.query('BEGIN');

            const orderInsertText = `INSERT INTO "order".order (user_id, date_time, total_amount, status, delivery_address, restaurant_id)
                                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING order_id`;
            const orderInsertValues = [order.userId, order.dateTime, order.amount, order.status, order.deliveryAddress, order.restaurantId];
            const orderRes = await client.query(orderInsertText, orderInsertValues);
            const newOrderId = orderRes.rows[0].order_id;

            const orderDetailText = `INSERT INTO order_detail.order_detail (order_id, product_id, total_price) 
                         VALUES ($1, $2, $3), ($4, $5, $6), ...;`;
            const orderDetailValues = order.products.map((product) => [newOrderId, product.id, product.price])

            await client.query(orderDetailText, orderDetailValues);

            await client.query('COMMIT');
            console.log('Транзакция успешно выполнена, ID нового заказа:', newOrderId);
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    }




    deleteOrder(id: UUID) {

    }

    updateOrderStatus(order: Order) {

    }

    findOrder(id: UUID): Order {

    }
}
