import Pool from "pg-pool";


export const pool = new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 12345,
    database: 'order',
    max: 20,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 1000,
});


