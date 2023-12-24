type DbConfig = {
  port: number,
  host: string,
  username: string,
  password: string,
  database: string,
};

export const loadDbConfig = (): DbConfig => {
  const port = parseInt(process.env.POSTGRES_PORT as string);

  if (!port) {
    throw new Error('Need POSTGRES_PORT on environment');
  }
  const host = process.env.POSTGRES_HOST;
  if (!host) {
    throw new Error('Need POSTGRES_HOST on environment');
  }
  const username = process.env.POSTGRES_USERNAME;
  if (!username) {
    throw new Error('Need POSTGRES_USERNAME on environment');
  }
  const password = process.env.POSTGRES_PASSWORD;
  if (!password) {
    throw new Error('Need POSTGRES_PASSWORD on environment');
  }
  const database = process.env.POSTGRES_DATABASE;
  if (!database) {
    throw new Error('Need POSTGRES_DATABASE on environment');
  }
  return { port, host, username, password, database };
};
