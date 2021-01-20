import { Router } from 'express';
import { SongController } from "../controllers/song.js";

const router = Router();

router.get('/', SongController.allSongs);

router.post('/', SongController.newSong);

router.get('/:id', SongController.songById);

router.put('/:id', SongController.updateSong);

router.delete('/:id', SongController.deleteSong);

export default router;

