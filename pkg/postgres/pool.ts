import Pool from "pg-pool";
import { loadDbConfig } from './loadDbConfig';

const config = loadDbConfig();

export const pool = new Pool({
  user: config.username,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database,
  max: 20,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
});
