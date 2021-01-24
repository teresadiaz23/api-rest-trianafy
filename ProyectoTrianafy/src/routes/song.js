import { Router } from 'express';
import { SongController } from "../controllers/song.js";
import { token } from '../services/passport/index.js';
import { validar } from '../middlewares/validacion.js';
import { body, param } from 'express-validator';

const router = Router();

router.get('/', token(), SongController.allSongs);

router.post('/', [
    body('title').exists().withMessage('Tiene que introducir el título de la canción'),
    body('artist').exists().withMessage('Tiene que introducir el nombre del cantante o grupo'),
    body('album').exists().withMessage('Tiene que introducir el nombre del álbum'),
    body('year').exists().withMessage('Tiene que introducir el año de publicación del album'),
    body('id').not().exists().withMessage('No tiene que introducir un id, se generará automáticamente.')
],
validar, token(), SongController.newSong);

router.get('/:id', [
    param('id').isMongoId().withMessage('El id no tiene el formato de MongoDB ObjectId')
],
validar, token(), SongController.songById);

router.put('/:id', [
    param('id').isMongoId().withMessage('El id no tiene el formato de MongoDB ObjectId')
    
],
validar, token(), SongController.updateSong);

router.delete('/:id', [
    param('id').isMongoId().withMessage('El id no tiene el formato de MongoDB ObjectId')
], validar, token(), SongController.deleteSong);

export default router;

