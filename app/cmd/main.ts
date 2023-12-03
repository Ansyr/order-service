require('dotenv').config()
import express from "express"
import {dbConnect} from "../pkg/postgres/db-connect";

async function startApp() {
    const app = express();
    await dbConnect();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    });
}

startApp()
