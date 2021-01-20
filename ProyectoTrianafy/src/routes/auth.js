import { Router } from 'express';
import { body } from 'express-validator';
import { emailExists, usernameExists } from '../models/user.js';
import { AuthController } from '../controllers/auth.js';
//import { validar } from '../middlewares/validacion';
//import { password } from '../services/passport';

const router = Router();

router.post('/register', AuthController.register);

//router.post('/login', password(), AuthController.login);

export default router;