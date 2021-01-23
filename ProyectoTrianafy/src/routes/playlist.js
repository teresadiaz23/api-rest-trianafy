import { Router } from 'express';
import { PlaylistController } from "../controllers/playlist.js"
import { token } from '../services/passport/index.js';


const router = Router();

router.get('/', token(), PlaylistController.allPlaylists);

router.post('/', token(), PlaylistController.newPlaylist);

router.get('/:id', token(), PlaylistController.playListById);

router.put('/:id', token(), PlaylistController.editPlaylist);

router.delete('/:id', token(), PlaylistController.deletePlaylist);

router.post('/:id_list/songs/:id_song', token(), PlaylistController.addSongPlaylist);

router.get('/:id/songs', token(), PlaylistController.allSongPlaylist);

router.get('/:id_list/songs/:id_song', token(), PlaylistController.getSongPlaylist);

router.delete('/:id_list/songs/:id_song', token(), PlaylistController.delSongPlaylist);


export default router;
