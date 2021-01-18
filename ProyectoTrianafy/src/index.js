import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import morgan from "morgan";
import morganBody from "morgan-body";

const app = express();

app.use(cors);
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));
morganBody(app);

app.listen(process.env.PORT, () =>
    console.log(`Servidor abierto en el puerto ${process.env.PORT}!`)
);