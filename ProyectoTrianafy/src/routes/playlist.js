import { Router } from 'express';
import { PlaylistController } from "../controllers/playlist.js"
import { token } from '../services/passport/index.js';
import { validar } from '../middlewares/validacion.js';
import { body, param } from 'express-validator';


const router = Router();

router.get('/', token(), PlaylistController.allPlaylists);

router.post('/', token(), PlaylistController.newPlaylist);

router.get('/:id', [
    param('id').isMongoId().withMessage('El id no tiene el formato de MongoDB ObjectId')
],
validar, token(), PlaylistController.playListById);

router.put('/:id', [
    param('id').isMongoId().withMessage('El id no tiene el formato de MongoDB ObjectId'),
    body('id').not().exists().withMessage('El id no se pude modificar')
],
validar, token(), PlaylistController.editPlaylist);

router.delete('/:id', [
    param('id').isMongoId().withMessage('El id no tiene el formato de MongoDB ObjectId')
],
validar, token(), PlaylistController.deletePlaylist);

router.post('/:id_list/songs/:id_song', [
    param('id_list').isMongoId().withMessage('El id de la lista de reproducción no tiene el formato de MongoDB ObjectId'),
    param('id_song').isMongoId().withMessage('El id de la canción no tiene el formato de MongoDB ObjectId')
],
validar, token(), PlaylistController.addSongPlaylist);

router.get('/:id/songs', [
    param('id').isMongoId().withMessage('El id no tiene el formato de MongoDB ObjectId')
],
validar, token(), PlaylistController.allSongPlaylist);

router.get('/:id_list/songs/:id_song', [
    param('id_list').isMongoId().withMessage('El id de la lista de reproducción no tiene el formato de MongoDB ObjectId'),
    param('id_song').isMongoId().withMessage('El id de la canción no tiene el formato de MongoDB ObjectId')
],
validar, token(), PlaylistController.getSongPlaylist);

router.delete('/:id_list/songs/:id_song', [
    param('id_list').isMongoId().withMessage('El id de la lista de reproducción no tiene el formato de MongoDB ObjectId'),
    param('id_song').isMongoId().withMessage('El id de la canción no tiene el formato de MongoDB ObjectId')
],
validar, token(), PlaylistController.delSongPlaylist);


export default router;
