
export const orderInsertTextQueryAndReturnOrderId = `INSERT INTO "order".order (order_id, user_id, date_time, total_amount, status, delivery_address, restaurant_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING order_id;
`


export const getOrderDetailTextQuery = (productsCount: number) => `
  INSERT INTO order_detail.order_detail (order_id, product_id, total_price)
  VALUES ${Array.from({ length: productsCount }, (_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(',')};
`;


export const deleteOrderQuery = `DELETE FROM "order".order WHERE order_id = $1`;

export const updateOrderStatusQuery = `UPDATE "order".order SET status = $1 WHERE order_id = $2;`


export const findOrderQuery = `SELECT * FROM "order".order WHERE order_id = $1;`
