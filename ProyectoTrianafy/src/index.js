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
import { canciones, playlists, usuarios } from "./models/datos.js";
import { Song } from "./models/song.js";
import { Playlist } from "./models/playlist.js";
import { User } from "./models/user.js";


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





// Inicialización del servidor y conexión a base de datos

app.use('/songs', routes.song);
app.use('/auth', routes.auth);
app.use('/users', routes.user);
app.use('/lists', routes.playlist);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  
    if (err) {
      console.log(`Error de conexión a la base de datos: ${JSON.stringify(err)}`);
    } else {
      console.log(`Conexión correcta a la base de datos en la URI ${process.env.DB_URI}`);

      const result = Song.countDocuments({}).exec();
      result.then(val => {
        if(val == 0){
          canciones.forEach(song => {
            song.save(err => {
              if(err) throw err;
              console.log("Guardado con éxito");
            });
          });
        }
      });

      const result2 = Playlist.countDocuments({}).exec();
      result2.then(val => {
        if(val == 0){
          playlists.forEach(song => {
            song.save(err => {
              if(err) throw err;
              console.log("Guardado con éxito");
            });
          });
        }
      });

      const result3 = User.countDocuments({}).exec();
      result3.then(val => {
        if(val == 0){
          usuarios.forEach(song => {
            song.save(err => {
              if(err) throw err;
              console.log("Guardado con éxito");
            });
          });
        }
      });
      
      app.listen(process.env.PORT, () =>
        console.log(
          `¡Servidor abierto en el puerto ${process.env.PORT}!`
        )
      );
    }
  
});

