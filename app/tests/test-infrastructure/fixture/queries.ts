export const insertRestaurantQuery = `INSERT INTO restaurant.restaurant (restaurant_id,name, address, cuisine_type)
                                      VALUES ($1, $2, $3, $4);`

export const insertUserQuery = `INSERT INTO "user".users (user_id, first_name, last_name, sur_name, email, phone,
                                                          address, password_hash, role)
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`


export const insertProductQuery = 'INSERT INTO product.product(product_id, name, price, description, restaurant_id,available) VALUES ($1, $2, $3, $4, $5, $6)'



export const findUserById = `SELECT * FROM "user".users WHERE user_id = $1;`



export const findOrderById = `SELECT * FROM "order".order WHERE order_id = $1;`
