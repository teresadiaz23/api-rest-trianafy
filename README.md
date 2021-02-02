# PROYECTO API REST CON NODE, EXPRESS, MONGO Y MONGOOSE

Este proyecto permite la gestión de listas de reproducción. Para ello hay que registrarse y loguearse en la aplicación, ya que todas las peticiones necesitan el token para acceder.
Al inicio, si las colecciones están vacías, se cargan unos datos iniciales que se encuentran en models/datos.js y que consta de 6 canciones, 2 listas de reproducción (una pública y otra privada) y un usuario. Las listas de reproducción tienen canciones añadidas y como usuario tienen al creado.
Un usuario podrá añadir canciones y podrá crear listas de reproducción, que serán públicas o privadas, y podrá editar, borrar y añadir canciones solamente a las listas de reproducción que haya creado. También prodrá ver las listas de reproducción creadas por otros usuarios siempre y cuando éstas sean públicas.

Usuario creado:
```json
{
    "username": "tdiaz",
    "password": "12345678"
}
```

Para ejecutar el proyecto, primero hay que crear el archivo .env y luego se inicia con el comando *npm start*.
Se pueden usar estos datos de ejemplo como propiedades para el archivo .env:
```properties
PORT=9000

# Secreto para la encriptación
JWT_SECRET=N&LvX$QXK049oj&0&$VPKzvB7uqknsfiubsaiysa

# Número de rondas utilizadas para el algoritmo de hashing de la contraseña
BCRYPT_ROUNDS=12

# Vida del token
JWT_LIFETIME=1d

# Algoritmo utilizado para el cifrado del token
JWT_ALGORITHM=HS256

DB_URI=mongodb://localhost/trianafy
``` 

En el archvo Trianafy.postman_collection.json se encuentra la colección de rutas para usarlo en Postman para que pueda ser importada.

