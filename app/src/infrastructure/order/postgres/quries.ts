import {Order} from "../../../domain/order/entity/order";

export const orderInsertQuery = `
            INSERT INTO  "order".order(order_id, user_id, date_time, total_amount, status, delivery_address, restaurant_id)
            VALUES ($1, $2, $3, $3, $4, $5, $6);`;


export const detailInsertQuery = `
                INSERT INTO order_detail (order_id, product_id, total_price)
                VALUES ($1, $2, $3);`
