import { Router } from 'express';
import { PlaylistController } from "../controllers/playlist.js"


const router = Router();

router.get('/', PlaylistController.allPlaylists);

router.post('/', PlaylistController.newPlaylist);

router.get('/:id', PlaylistController.playListById);

router.put('/:id', PlaylistController.editPlaylist);

router.delete('/:id', PlaylistController.deletePlaylist);


export default router;