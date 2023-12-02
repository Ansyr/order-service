require('dotenv').config()
import express from "express"
import { testDbConnect } from "../pkg/postgres/testDbConnect";

async function startApp() {
    const app = express();
    await testDbConnect();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    });
}

startApp()
