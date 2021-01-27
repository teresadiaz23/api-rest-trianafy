import { Playlist, PlaylistRepository } from "../models/playlist.js";
import { toDto, UserRepository } from "../models/user.js";
import { SongRepository } from "../models/song.js";


const PlaylistController = {

    allPlaylists: async (req, res) => {
        try{
            const lists = await PlaylistRepository.findAll();
            
            if (Array.isArray(lists) && lists.length > 0){
                let usuario = await req.user;
                let result = lists.filter(l => l.user._id == usuario.id);
                console.log(result)
                if(result.length > 0){
                    res.status(200).json(result);
                }
                else{
                    res.status(404).send('No tienes listas de reproducción propias.')
                }
                
            }
            else{
                res.sendStatus(404);
            }
        }
        catch(error){
            res.sendStatus(400);
        }
        
        
    },

    playListById: async (req, res) => {
        
        try{
            let list = await PlaylistRepository.findById(req.params.id);
            
            if(list != undefined){
                let usuario = await req.user;
                if(list.user._id == usuario.id){
                    res.json(list);
                }
                else{
                    res.status(401).send('Esa lista de reproducción es privada')
                }
            }
            else{
                res.sendStatus(404);
            }
        }
        catch(error){
            res.sendStatus(400);
        }
        
    },

    newPlaylist: async (req, res) => {
        try{
            let list = await PlaylistRepository.create({
                name: req.body.name,
                description: req.body.description,
                
            });
            
            if (list) {
                let usuario = await req.user;
                list.user = usuario;
                await list.save();
                res.status(201).json(await PlaylistRepository.findById(list._id));
            }
            else{
                res.sendStatus(404);
            }
        }
        catch(error){
            res.sendStatus(400);
        }
        
    },

    //Editar con comprobación del usuario
    editPlaylist: async (req, res) => {
        try{
            let lista = await PlaylistRepository.findById(req.params.id);
            let usuario = await req.user;
            if(lista.user._id == usuario.id){
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
            }
            else{
                res.status(401).send('No tienes permiso para editar esa lista de reproducción.')
            }
            
        }
        catch(error) {
            res.sendStatus(400);
        }
        
    },

    //Editar sin comprobar el usuario
    // editPlaylist: async (req, res) => {
    //     try{
            
    //         let list = await PlaylistRepository
    //         .updateById(req.params.id, {
    //             name: req.body.name,
    //             description: req.body.description
    //         });

    //         if(list != undefined) {
    //             res.status(204).json(list);
    //         }
    //         else{
    //             res.sendStatus(404);
    //         }
    //     }
    //     catch(error) {
    //         res.sendStatus(400);
    //     }
        
    // },

    deletePlaylist: async (req, res) => {
        try{
            let list = await PlaylistRepository.findById(req.params.id);
            let usuario = await req.user;
            if(list.user._id == usuario.id){
                await PlaylistRepository.delete(req.params.id);
                res.sendStatus(204);
            }
            else{
                res.status(401).send('No tienes permiso para borrar esa lista de reproducción.')
            }
        }
        catch (error){
            res.sendStatus(400);
        }
        
    },

    addSongPlaylist: async(req, res) => {
        try{
            let song = await SongRepository.findById(req.params.id_song);
            if (song != undefined) {
                let list = await PlaylistRepository.findById(req.params.id_list);
                if(list != undefined){
                    let usuario = await req.user;
                    if(list.user._id == usuario.id){
                        list.songs.push(song._id);
                        await list.save();
                        res.json(await PlaylistRepository.findById(list._id));
                    }
                    else{
                        res.status(401).send('No tienes permiso para añadir canciones a esa lista de reproducción.')
                    }
                }
                else{
                    res.sendStatus(404);
                }
            }
            else{
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.sendStatus(400);
        }
        
    },

    allSongPlaylist: async (req, res) => {
        try{
            let list = await PlaylistRepository.findById(req.params.id);
            let usuario = await req.user;
            if(list.user._id == usuario.id){
                if(list != undefined) {
                    let songs = list.songs;
                    res.json(songs);
                }
                else{
                    res.sendStatus(404);
                }
            }
            else{
                res.status(401).send('No tienes permiso para ver esa lista de reproducción.')
            }
            
        }
        catch (error) {
            res.sendStatus(400);
        }
        
    },

    getSongPlaylist: async (req, res) => {
        try{
            let list = await PlaylistRepository.findById(req.params.id_list);
            let usuario = await req.user;
            if(list.user._id == usuario.id){
                if(list != undefined) {
                    
                    let song = await SongRepository.findById(req.params.id_song);
                    let result = list.songs.find(s => s.id == song.id);
                    if(result != undefined){
                        res.json(result);
                    }
                    else{
                        res.status(404).send('Esa canción no se encuentra en la lista de reproducción.')
                    }

                    // if(song != undefined){
                        
                    //         res.json(song);
                        
                    //     else{
                    //         res.status(404).send('Esa canción no se encuentra en la lista de reproducción.')
                    //     }
                        
                    // }
                    // else{
                    //     res.sendStatus(404);
                    // }
                }
                else{
                    res.sendStatus(404);
                }
                
            }
            else{
                res.status(401).send('No tienes permiso para ver esa lista de reproducción.')
            }
            
            
        }
        catch(error){
            res.sendStatus(400);
        }
        
    },

    delSongPlaylist: async (req, res) => {
        try{
            let list = await PlaylistRepository.findById(req.params.id_list);
            let usuario = await req.user;
            if(list.user._id == usuario.id){
                if (list != undefined) {
                    list.songs.pull(req.params.id_song);
                    await list.save();
                    res.status(204).json(await PlaylistRepository.findById(list._id));
                }
                else{
                    res.sendStatus(404);
                }
            }
            else{
                res.status(401).send('No tienes permiso para borrar esa canción de la lista de reproducción.')
            }
            
        }
        catch(error) {
            res.sendStatus(400);
        }
        
    }

}


export {
    PlaylistController
}