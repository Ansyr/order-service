export const insertRestaurantQuery = "INSERT INTO restaurant.restaurant (restaurant_id, name, address, cuisine_type) VALUES ($1, $2, $3, $4)"

export const updateRestaurantQuery =  "UPDATE restaurant.restaurant SET name = $1, address = $2 WHERE restaurant_id = $3"

export const findRestaurantQuery = "SELECT * FROM restaurant.restaurant WHERE restaurant_id = $1"


export const deleteRestaurantQuery = "DELETE FROM restaurant.restaurant WHERE restaurant_id = $1"
