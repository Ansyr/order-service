import {testDbPool} from "../test-pool";

export const destroyTestData = async () => {
    await testDbPool.query(`TRUNCATE TABLE
    "user".users,
    restaurant.restaurant,
     review.review,
     "order".order,
     order_detail.order_detail,
     product.product,
     product_category.product_category,
     product_category_mapping.product_category_mapping,
     delivery.delivery
     RESTART IDENTITY;`);
}
