import {OrderRepository} from "../../../../application/order/interfaces";
import Pool from "pg-pool";
import {Order} from "../../../../domain/order/entity/order";
import {
    deleteOrderQuery, findOrderQuery,
    getOrderDetailTextQuery,
    orderInsertTextQueryAndReturnOrderId,
    updateOrderStatusQuery
} from "./quries";
import {UUID} from "crypto";


export class OrderRepo implements OrderRepository {
    private pool: Pool<any>

    constructor(pool: Pool<any>) {
        this.pool = pool
    }

    async saveOrder(order: Order) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const orderInsertValues = [order.id.id, order.userId.id, order.dateTime, order.amount.amount, order.status, order.deliveryAddress.getFullAddress(), order.restaurantId.id];
            const orderRes = await client.query(orderInsertTextQueryAndReturnOrderId, orderInsertValues);
            const newOrderId = orderRes.rows[0].order_id;
            const orderDetailValues = order.products.map(product => [newOrderId, product.id, product.price]).flat();
            await client.query(getOrderDetailTextQuery(order.products.length), orderDetailValues);

            await client.query('COMMIT');
        } catch (e) {
            console.error('Failed to save order:', e);
            await client.query('ROLLBACK');
        } finally {
            client.release();
        }
    }




    async deleteOrder(id: UUID) {
        const client = await this.pool.connect()
        try{
            await client.query('BEGIN');
            await client.query(deleteOrderQuery, [id])

            await client.query('COMMIT');
        }catch (e){
            console.error('Failed to delete order:', e);
            await client.query('ROLLBACK');
        }finally {
            client.release()
        }
    }

    async updateOrderStatus(order: Order) {
        const client = await this.pool.connect()
        try {
            await client.query('BEGIN');
            await client.query(updateOrderStatusQuery, [order.status, order.id])

            await client.query('COMMIT');
        }catch (e){
            console.error('Failed to update order status:', e);
            await client.query('ROLLBACK');
        }finally {
            client.release()
        }
    }

    async findOrder(id: UUID): Promise<Order | null> {
        const client = await this.pool.connect()
        try {
            const res = await client.query(findOrderQuery, [id])
            if (res.rows.length === 0) {
                throw new Error('Order not found')
            }
            return Order.create(
                res.rows[0].order_id,
                res.rows[0].user_id,
                res.rows[0].date_time,
                res.rows[0].total_price,
                res.rows[0].status,
                res.rows[0].amount,
                res.rows[0].delivery_address,
                res.rows[0].restaurant_id,
                res.rows[0].products
            )

        }catch (e){
            console.error('Failed to find order:', e);
            return null
        }finally {
            client.release()
        }
    }
}
