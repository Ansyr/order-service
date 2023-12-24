import {Product} from "../../../../src/domain/product/entity/product";
import {RestaurantId} from "../../../../src/domain/value-object/restuarant-id";
import {Price} from "../../../../src/domain/value-object/price";
import {ProductId} from "../../../../src/domain/value-object/product-id";
import {insertProductQuery} from "../queries";
import {testDbPool} from "../fixtures.test";

export const createProductFixture = async (productId: ProductId, restaurantId: RestaurantId): Promise<Product> => {
    const name = 'Product'
    const price = new Price(100)
    const description = 'Description'

    const product = Product.create(productId, name, price, description, restaurantId);

    await testDbPool.query(insertProductQuery, [
        productId.id,
        name,
        price.price,
        description,
        restaurantId.id,
        true
    ])
    return product
}
