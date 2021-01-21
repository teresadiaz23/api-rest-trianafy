import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import morgan from "morgan";
import morganBody from "morgan-body";
import mongoose from 'mongoose';
import passport from './services/passport/index.js';

import models from './models/index.js';
import routes from './routes/index.js';


const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
morganBody(app);

app.use(passport.initialize());

app.use((req, res, next) => {
    
    req.context = {
      models,
    };
    next();
  });




// app.get('/hello', (req, res) => {
//     res.send("¡Hola Mundo!");
// });
  

// app.listen(process.env.PORT, () =>
//     console.log(`Servidor abierto en el puerto ${process.env.PORT}!`)
// );




// Inicialización del servidor y conexión a base de datos

app.use('/songs', routes.song);
app.use('/auth', routes.auth);
app.use('/users', routes.user);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
    if (err) {
      console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
    } else {
      console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);
      app.listen(process.env.PORT, () =>
        console.log(
          `¡Servidor abierto en el puerto ${process.env.PORT}!`
        )
      );
    }
  
});

// mongoose.connect('mongodb://localhost/trianafy', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
//     if (err) {
//       console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
//     } else {
//       console.log(`Conexión correcta a la base de datos en la URI mongodb://localhost/trianafy`);
//       app.listen(9000, () =>
//         console.log(
//           `¡Servidor abierto en el puerto 9000!`
//         )
//       );
//     }
  
// });

