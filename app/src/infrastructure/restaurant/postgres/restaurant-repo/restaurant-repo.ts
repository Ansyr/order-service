import Pool from "pg-pool";
import {RestaurantRepository} from "../../../../application/restaurant/interfaces";
import {Restaurant} from "../../../../domain/restaurant/entity/restaurant";
import {deleteRestaurantQuery, findRestaurantQuery, insertRestaurantQuery, updateRestaurantQuery} from "./queries";

export class RestaurantRepo implements RestaurantRepository {
    private pool: Pool<any>

    constructor(pool: Pool<any>) {
        this.pool = pool
    }

    async saveRestaurant(restaurant: Restaurant) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const restaurantInsertValues = [restaurant.id.id, restaurant.name, restaurant.address.getFullAddress(), restaurant.cuisineType];
            await client.query(insertRestaurantQuery, restaurantInsertValues);
            await client.query('COMMIT');
        } catch (e) {
            console.error('Failed to save restaurant:', e);
            await client.query('ROLLBACK');
        } finally {
            client.release();
        }
    }

    async updateRestaurant(restaurant: Restaurant) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(
                updateRestaurantQuery,
                [restaurant.name, restaurant.address, restaurant.id]
            )
            await client.query('COMMIT');
        } catch (e) {
            console.error('Failed to update restaurant:', e);
            await client.query('ROLLBACK');
        } finally {
            client.release();
        }
    }

    async findRestaurant(restaurantId: string): Promise<Restaurant | null> {
        const client = await this.pool.connect();
        try {
            const res = await client.query(findRestaurantQuery, [restaurantId]);
            if (res.rows.length === 0) {
                return null
            }
            return Restaurant.create(
                res.rows[0].restaurant_id,
                res.rows[0].name,
                res.rows[0].address,
                res.rows[0].cuisine_type,
            )
        } catch (e) {
            console.error('Failed to find restaurant:', e);
            return null
        } finally {
            client.release();
        }
    }

    async deleteRestaurant(restaurantId: string) {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(deleteRestaurantQuery, [restaurantId]);
            await client.query('COMMIT');
        } catch (e) {
            console.error('Failed to delete restaurant:', e);
            await client.query('ROLLBACK');
        } finally {
            client.release();
        }
    }
}
