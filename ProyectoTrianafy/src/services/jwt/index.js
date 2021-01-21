import "dotenv/config.js";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const jwtLifetime = process.env.JWT_LIFETIME;
const jwtAlgorithm = process.env.JWT_ALGORITHM;

export const JwtService = {

    sign: (user) => jwt.sign({sub:user.id}, secret, {
        algorithm: jwtAlgorithm,
        expiresIn: jwtLifetime
    }),

    verify: (token) => jwt.verify(token, secret)

}
