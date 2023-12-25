import Pool from "pg-pool";
import {Product} from "../../../../domain/product/entity/product";
import {ProductRepository} from "../../../../application/product/interfaces";

export class ProductRepo implements ProductRepository{

    private pool: Pool<any>

    constructor(pool: Pool<any>){
        this.pool = pool
    }

    async saveProduct(product: Product){
        const client = await this.pool.connect()
        try{
            await client.query('BEGIN');
            console.log(product)
            await client.query("INSERT INTO product.product (product_id, name, price, description, restaurant_id) VALUES ($1, $2, $3, $4, $5)", [product.id.id, product.name, product.price.price, product.description, product.restaurantId.id])
            await client.query('COMMIT');
        }catch (e){
            console.error('Failed to save product:', e);
            await client.query('ROLLBACK');
        }finally {
            client.release()
        }
    }

    async deleteProduct(id: string){
        const client = await this.pool.connect()
        try{
            await client.query('BEGIN');
            await client.query("DELETE FROM product.product WHERE product_id = $1", [id])
            await client.query('COMMIT');
        }catch (e){
            console.error('Failed to delete product:', e);
            await client.query('ROLLBACK');
        }finally {
            client.release()
        }
    }

    async updateProduct(product: Product){
        const client = await this.pool.connect()
        try{
            await client.query('BEGIN');
            await client.query("UPDATE product.product SET name = $1, price = $2, description = $3 WHERE product_id = $4", [product.name, product.price, product.description, product.id.id])
            await client.query('COMMIT');
        }catch (e){
            console.error('Failed to update product:', e);
            await client.query('ROLLBACK');
        }finally {
            client.release()
        }
    }

    async findProduct(id: string): Promise<Product | null>{
        const client = await this.pool.connect()
        try{
            const res = await client.query("SELECT * FROM product.product WHERE product_id = $1", [id])
            if (res.rows.length === 0) {
                return null
            }
            return Product.create(
                res.rows[0].product_id,
                res.rows[0].name,
                res.rows[0].price,
                res.rows[0].description,
                res.rows[0].restaurant_id
            )
        }catch (e){
            console.error('Failed to find product:', e);
            return null
        }finally {
            client.release()
        }
    }
}
