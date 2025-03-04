import "dotenv/config.js";
import { User, UserRepository, toDto } from "../models/user.js";
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt/index.js';

const AuthController = {

    register: async (req, res, next) => {
        
        try{
            let newUser = await UserRepository.create({
                fullname: req.body.fullname,
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))
                });
                
            res.status(201).json(toDto(newUser));
        }
        catch (error){
            res.status(400).json(error.message);
        }
        
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