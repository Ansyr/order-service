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



