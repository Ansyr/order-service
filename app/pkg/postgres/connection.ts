import {Pool} from 'postgresql-client';
import {Config} from "./config";


export function newConnection(config: Config): Pool {
    return  new Pool(config.getDSN());
}
