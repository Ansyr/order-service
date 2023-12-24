import Pool from "pg-pool";



export const testDbPool = new Pool({
    user: 'testpostgres',
    password: 'testroot',
    host: 'localhost',
    port: 12346,
    database: 'order_test',
    max: 20,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 1000,
});

export const initializeTestData = async ()  => {
    await testDbPool.connect();
};


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
