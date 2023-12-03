import {Order} from "../../../domain/order/entity/order";

export const orderInsertTextQuery = `INSERT INTO "order".order (user_id, date_time, total_amount, status,
                                                                delivery_address, restaurant_id)
                                     VALUES ($1, $2, $3, $4, $5, $6)
                                     RETURNING order_id`;


export const getOrderDetailTextQuery = (productsCount: number) => `
  INSERT INTO order_detail.order_detail (order_id, product_id, total_price)
  VALUES ${Array.from({ length: productsCount }, (_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(',')};
`;

