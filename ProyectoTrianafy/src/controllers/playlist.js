import { Playlist, PlaylistRepository } from "../models/playlist.js";
import { UserRepository } from "../models/user.js";
import { SongRepository } from "../models/song.js";


const PlaylistController = {

    allPlaylists: async (req, res) => {
        const lists = await PlaylistRepository.findAll();
        if (Array.isArray(lists) && lists.length > 0){
            res.status(200).json(lists);
        }
        else{
            res.sendStatus(404);
        }
    },

    playListById: async (req, res) => {
        let list = await PlaylistRepository.findById(req.params.id);
        if(list != undefined){
            res.json(list);
        }
        else{
            res.sendStatus(404);
        }
    },

    newPlaylist: async (req, res) => {
        let list = await PlaylistRepository.create({
            name: req.body.name,
            description: req.body.description
        });
        if (list) {
            res.status(201).json(list);
        }
        else{
            res.sendStatus(404);
        }
    },

    editPlaylist: async (req, res) => {
        let list = await PlaylistRepository
        .updateById(req.params.id, {
            name: req.body.name,
            description: req.body.description
        });

        if(list != undefined) {
            res.status(204).json(list);
        }
        else{
            res.sendStatus(404);
        }
    },

    deletePlaylist: async (req, res) => {
        await PlaylistRepository.delete(req.params.id);
        res.sendStatus(204);
    },

    addSongPlaylist: async(req, res) => {
        let song = await SongRepository.findById(req.params.id_song);
        if (song != undefined) {
            let list = await PlaylistRepository.findById(req.params.id_list);
            if(list != undefined){
                list.songs.push(song._id);
                await list.save();
                res.json(await PlaylistRepository.findById(list._id));
            }
            else{
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(404);
        }
    },

    allSongPlaylist: async (req, res) => {
        let list = await PlaylistRepository.findById(req.params.id);
        if(list != undefined) {
            let songs = list.songs;
            console.log(songs)
            res.json(songs);
        }
        else{
            res.sendStatus(404);
        }
    },

    getSongPlaylist: async (req, res) => {
        let list = await PlaylistRepository.findById(req.params.id_list);
        if(list != undefined) {
            let song = await SongRepository.findById(req.params.id_song);
            if(song != undefined){
                res.json(song);
            }
            else{
                res.sendStatus(404);
            }
        }
        else{
            res.sendStatus(404);
        }
    },

    delSongPlaylist: async (req, res) => {
        let list = await PlaylistRepository.findById(req.params.id_list);
        if (list != undefined) {
            list.songs.pull(req.params.id_song);
            await list.save();
            res.status(204).json(await PlaylistRepository.findById(list._id));
        }
        else{
            res.sendStatus(404);
        }
    }

}





export {
    PlaylistController
}