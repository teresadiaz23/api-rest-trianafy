import { Router } from 'express';
import { body } from 'express-validator';
import { emailExists, usernameExists } from '../models/user.js';
import { AuthController } from '../controllers/auth.js';
import { validar } from '../middlewares/validacion.js';
import { password } from '../services/passport/index.js';

const router = Router();

router.post('/register', 
[
    body('username')
        .custom(async username => {
            if(await usernameExists(username)) {
                throw new Error('Ese nombre de usuario ya existe, introduce otro.');
            }
            else{
                return true;
            }
        }),
    body('password').isLength({min: 8, max: 16}).withMessage('La contraseña tiene que tener entre 8 y 16 caracteres.'),
    body('email').isEmail().withMessage('Introduce un email válido')
        .custom(async email => {
            if(await emailExists(email)){
                throw new Error('El email ya existe, introduce otro.');
            }
            else{
                return true;
            }
        }),
    body('id').not().exists().withMessage('No tiene que introducir un id, se generará automáticamente.')
], 
validar,
AuthController.register);

router.post('/login', password(), AuthController.login);

export default router;

