import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import morgan from "morgan";
import morganBody from "morgan-body";
import mongoose from 'mongoose';

// import models from './models';
// import routes from './routes';

const app = express();

app.use(cors);
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));
morganBody(app);

app.use((req, res, next) => {
    
    req.context = {
      models,
    };
    next();
  });

// app.listen(process.env.PORT, () =>
//     console.log(`Servidor abierto en el puerto ${process.env.PORT}!`)
// );

// Inicialización del servidor y conexión a base de datos

mongoose.connect('mongodb://localhost/mongoose', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
    if (err) {
      console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
    } else {
      console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
      app.listen(process.env.PORT, () =>
        console.log(
          `¡Aplicación de ejemplo escuchando en el puerto ${process.env.PORT}!`
        )
      );
    }
  
});