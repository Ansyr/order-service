import {OrderRepository} from "../../../application/order/interfaces";
import {Order} from "../../../domain/order/entity/order";
import {UUID} from "crypto";
import Pool from "pg-pool";
import {
    deleteOrderQuery,
    findOrderQuery,
    getOrderDetailTextQuery,
     orderInsertTextQueryAndReturnOrderId,
    updateOrderStatusQuery
} from "./quries";


export class OrderRepo implements OrderRepository {
    private pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async saveOrder(order: Order) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const orderInsertValues = [order.id.id, order.userId.id, order.dateTime, order.amount.amount, order.status, order.deliveryAddress.getFullAddress(), order.restaurantId.id];
            const orderRes = await client.query(orderInsertTextQueryAndReturnOrderId, orderInsertValues);
            const newOrderId = orderRes.rows[0].order_id;

            const orderDetailValues = order.products.map(product => [newOrderId, product.id.id, product.price.price]).flat();
            await client.query(getOrderDetailTextQuery(order.products.length), orderDetailValues);

            await client.query('COMMIT');
        } catch (e) {
            console.error('Failed to save order:', e);
            await client.query('ROLLBACK');
            throw new Error("Failed to save order", e.message);
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
          await client.query('ROLLBACK');
          throw new Error("Failed to delete order",e)
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
            await client.query('ROLLBACK');
            throw new Error("Failed to update order status",e)
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
            throw new Error("Failed to find order",e)
        }finally {
            client.release()
        }
    }
}
