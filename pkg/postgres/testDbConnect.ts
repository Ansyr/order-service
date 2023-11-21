import { pool } from "./pool"

export const testDbConnect = async () => {
  let client;
  try {
    client = await pool.connect();
    client.release();
  } catch {
    await pool.end();
    throw new Error("coudn't connect to db");
  }
}
