import 'dotenv/config';
import { User, UserRepository } from "../models/user.js";
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';

const AuthController = {

    register: (req, res, next) => {
        let newUser = UserRepository.create(
            new User(req.body.fullname,
                req.body.username,
                req.body.email,
                bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS)))
        );
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