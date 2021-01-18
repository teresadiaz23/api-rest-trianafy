Propiedades para el archivo .env
```properties
PORT=9000

# Secreto para la encriptación
JWT_SECRET=esteEsElSecretoMásSecretoDeTodosLosSecretos

# Número de rondas utiliadas para el algoritmo de hashing de la contraseña
BCRYPT_ROUNDS=12

# Vida del token
JWT_LIFETIME=1d

# Algoritmo utilizado para el cifrado del token
JWT_ALGORITHM=HS256

DB_URI=mongodb://localhost/mongoose
```