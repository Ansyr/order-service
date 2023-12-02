import * as process from "process";
export function getEnv(key: string, defaultValue: string) : string{
    if (process.env[key] === undefined){
        return defaultValue;
    }
    return String(process.env[key])
}
