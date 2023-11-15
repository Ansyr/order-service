import { Pool } from 'postgresql-client';
import { Config } from "./config";

export class Connection {
    constructor(private pool: Pool) {}

}

export function newConnection(config: Config): Connection {
    const db = new Pool(config.getDSN());

    return new Connection(db);
}
