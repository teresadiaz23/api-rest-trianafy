import "dotenv/config.js";
import { User, UserRepository } from "../models/user.js";
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt/index.js';

const AuthController = {

    register: async (req, res, next) => {
        
        let newUser = await UserRepository.create({
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))
            });
            
        res.status(201).json(newUser);
    },

    login: (req, res, next) => {
        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });
    }

}

export {
    AuthController
}