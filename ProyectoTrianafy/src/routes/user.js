import { Router } from 'express';
import { UserController } from "../controllers/user.js";

const router = Router();

router.get('/', UserController.allUsers);


export default router;


