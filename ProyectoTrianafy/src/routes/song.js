import { Router } from 'express';
import { SongController } from "../controllers/song.js";
import { token } from '../services/passport/index.js';

const router = Router();

router.get('/', token(), SongController.allSongs);

router.post('/', token(), SongController.newSong);

router.get('/:id', token(), SongController.songById);

router.put('/:id', token(), SongController.updateSong);

router.delete('/:id', token(), SongController.deleteSong);

export default router;

