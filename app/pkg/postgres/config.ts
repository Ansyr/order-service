import {getEnv} from "../env/env";

type PullConfig = {
    min: number
    max: number
    idleTimeoutMills: number
}


export class Config {
    constructor(
        public port: string,
        public host: string,
        private username: string,
        private password: string,
        private database: string,
        public pullConfig: PullConfig
    ) {
    }

    getDSN(): string {
        return `postgres://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`
    }

    getPool()  {
        return {
            host:  `postgres://${this.host}:`,
            pool:{
                min: this.pullConfig.min,
                max: this.pullConfig.max,
                idleTimeoutMills: this.pullConfig.idleTimeoutMills
            }
        }
    }

}


export function defaultConfig(): Config {
    return new Config(getEnv('POSTGRES_DEFAULT_PORT', "5432"),
        getEnv('POSTGRES_DEFAULT_HOST', 'localhost'),
        getEnv('POSTGRES_DEFAULT_USERNAME', 'postgres'),
        getEnv('POSTGRES_DEFAULT_PASSWORD', 'root'),
        getEnv('POSTGRES_DEFAULT_DATABASE', 'postgres'), {
            min: 2,
            max: 10,
            idleTimeoutMills: 30000
        })
}
