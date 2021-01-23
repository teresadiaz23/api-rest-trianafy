import { Router } from 'express';
import { PlaylistController } from "../controllers/playlist.js"
import { Playlist } from '../models/playlist.js';


const router = Router();

router.get('/', PlaylistController.allPlaylists);

router.post('/', PlaylistController.newPlaylist);

router.get('/:id', PlaylistController.playListById);

router.put('/:id', PlaylistController.editPlaylist);

router.delete('/:id', PlaylistController.deletePlaylist);

router.post('/:id_list/songs/:id_song', PlaylistController.addSongPlaylist);

router.get('/:id/songs', PlaylistController.allSongPlaylist);

router.get('/:id_list/songs/:id_song', PlaylistController.getSongPlaylist);

router.delete('/:id_list/songs/:id_song', PlaylistController.delSongPlaylist);


export default router;
