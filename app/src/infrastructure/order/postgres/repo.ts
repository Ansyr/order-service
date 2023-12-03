import { OrderRepository } from "../../../application/order/interfaces";
import { Order } from "../../../domain/order/entity/order";
import { UUID } from "crypto";
import Pool from "pg-pool";
import {getOrderDetailTextQuery, orderInsertTextQuery} from "./quries";


export class OrderRepo implements OrderRepository {
    private pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async saveOrder(order: Order) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');


            const orderInsertValues = [order.userId, order.dateTime, order.amount, order.status, order.deliveryAddress, order.restaurantId];
            const orderRes = await client.query(orderInsertTextQuery , orderInsertValues);
            const newOrderId = orderRes.rows[0].order_id;

            const orderDetailValues = order.products.reduce((acc, product) => [...acc, newOrderId, product.id, product.price], [])

            await client.query(getOrderDetailTextQuery(order.products.length), orderDetailValues);

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
