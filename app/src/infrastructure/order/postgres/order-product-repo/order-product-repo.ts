import {Product} from "../../../../domain/product/entity/product";
import {OrderProductRepository} from "../../../../application/order/interfaces";
import {UUID} from "crypto";
import Pool from "pg-pool";
import {getAllProducts} from "./queries";

export class OrderProductRepo implements OrderProductRepository {
    private pool: Pool<any>

    constructor(pool: Pool<any>) {
        this.pool = pool
    }

    async getProducts(id: UUID[]): Promise<Product[]> {
        const client = await this.pool.connect()
        try {
            const res = await client.query(getAllProducts, [id])
            return res.rows.map((row: any) => {
                return {
                    id: row.product_id,
                    name: row.name,
                    price: row.price,
                    description: row.description,
                    restaurantId: row.restaurant_id,
                    available: row.available
                }
            })
        } catch (e) {
            console.error('Failed to get products:', e);
            return []
        } finally {
            client.release();
        }
    }
}
