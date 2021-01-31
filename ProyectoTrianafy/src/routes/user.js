import { Router } from 'express';
import { param } from 'express-validator';
import { UserController } from "../controllers/user.js";
import { validar } from '../middlewares/validacion.js';
import { token } from '../services/passport/index.js';

const router = Router();

router.get('/', token(), UserController.allUsers);

router.get('/:id', [
    param('id').isMongoId().withMessage('El id no tiene el formato de MongoDB ObjectId')
],
validar, token(), UserController.userById);


export default router;


