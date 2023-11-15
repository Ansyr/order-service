import express from "express"
import {getEnv} from "../pkg/env/env";
import {defaultConfig} from "../pkg/postgres/config";
import { newConnection} from "../pkg/postgres/connection";
require('dotenv').config()


async function startApp() {
    const app = express();
    const postgreConf = defaultConfig()
    const postgreCon = newConnection(postgreConf)
    
    try {
        app.listen(getEnv("SERVER_DEFAULT_PORT","4001"), () => {
            console.log(`Server started on port ${getEnv("SERVER_DEFAULT_PORT","3000")}`)
        })
    }catch (e){
        console.log(e)
    }
}

startApp()
