import { Router } from 'express';
import { UserController } from "../controllers/user.js";
import { token } from '../services/passport/index.js';

const router = Router();

router.get('/', token(), UserController.allUsers);


export default router;


