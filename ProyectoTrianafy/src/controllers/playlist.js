import { Playlist, PlaylistRepository } from "../models/playlist.js";
import { toDto, UserRepository } from "../models/user.js";
import { SongRepository } from "../models/song.js";


const PlaylistController = {

    allPlaylists: async (req, res) => {
        try{
            const lists = await PlaylistRepository.findAll();
            
            if (Array.isArray(lists) && lists.length > 0){
                let publicas = lists.filter(l => l.public == true);
                let usuario = await req.user;
                let result = lists.filter(l => l.user._id == usuario.id);
                if(result.length > 0){
                    publicas.forEach( c => {
                        if(!result.includes(c))
                            result.push(c);
                    });
                    
                    res.status(200).json(result);
                }
                else{
                    if(publicas.length > 0){
                        res.status(200).json(publicas); 
                    }
                    else{
                        res.status(404).send('No tienes listas de reproducción propias y no hay ninguna pública.')
                    }
                    
                }
                
            }
            else{
                res.sendStatus(404);
            }
        }
        catch(error){
            res.status(400).json(error.message);
        }
        
        
    },

    playListById: async (req, res) => {
        
        try{
            let list = await PlaylistRepository.findById(req.params.id);
            
            if(list != undefined){
                let usuario = await req.user;
                if(list.user._id == usuario.id || list.public){
                    res.json(list);
                }
                else{
                    res.status(401).send('Esta lista de reproducción es privada')
                }
            }
            else{
                res.sendStatus(404);
            }
        }
        catch(error){
            res.status(400).json(error.message);
        }
        
    },

    newPlaylist: async (req, res) => {
        try{
            let list = await PlaylistRepository.create({
                name: req.body.name,
                description: req.body.description,
                user: await req.user,
                public: req.body.public  
            });
            
            if (list) {
                res.status(201).json(await PlaylistRepository.findById(list._id));
            }
            else{
                res.sendStatus(404);
            }
        }
        catch(error){
            res.status(400).json(error.message);
        }
        
    },

    
    editPlaylist: async (req, res) => {
        try{
            let lista = await PlaylistRepository.findById(req.params.id);
            let usuario = await req.user;
            if(lista.user._id == usuario.id){
                let list = await PlaylistRepository
                .updateById(req.params.id, {
                    name: req.body.name,
                    description: req.body.description,
                    public: req.body.public
                });

                if(list != undefined) {
                    res.status(204).json(list);
                }
                else{
                    res.sendStatus(404);
                }
            }
            else{
                res.status(401).send('No tienes permiso para editar esta lista de reproducción.')
            }
            
        }
        catch(error) {
            res.status(400).json(error.message);
        }
        
    },

    
    deletePlaylist: async (req, res) => {
        try{
            let list = await PlaylistRepository.findById(req.params.id);
            let usuario = await req.user;
            if(list.user._id == usuario.id){
                await PlaylistRepository.delete(req.params.id);
                res.sendStatus(204);
            }
            else{
                res.status(401).send('No tienes permiso para borrar esta lista de reproducción.')
            }
        }
        catch (error){
            res.status(400).json(error.message);
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
                        res.status(401).send('No tienes permiso para añadir canciones a esta lista de reproducción.')
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
            res.status(400).json(error.message);
        }
        
    },

    allSongPlaylist: async (req, res) => {
        try{
            let list = await PlaylistRepository.findById(req.params.id);
            let usuario = await req.user;
            if(list.user._id == usuario.id || list.public){
                if(list != undefined) {
                    let songs = list.songs;
                    res.json(songs);
                }
                else{
                    res.sendStatus(404);
                }
            }
            else{
                res.status(401).send('Esta lista de reproducción es privada.')
            }
            
        }
        catch (error) {
            res.status(400).json(error.message);
        }
        
    },

    getSongPlaylist: async (req, res) => {
        try{
            let list = await PlaylistRepository.findById(req.params.id_list);
            let usuario = await req.user;
            if(list.user._id == usuario.id || list.public){
                if(list != undefined) {
                    let song = await SongRepository.findById(req.params.id_song);
                    let result = list.songs.find(s => s.id == song.id);
                    if(result != undefined){
                        res.json(result);
                    }
                    else{
                        res.status(404).send('Esa canción no se encuentra en la lista de reproducción.')
                    }
                }
                else{
                    res.sendStatus(404);
                }
                
            }
            else{
                res.status(401).send('Esta lista de reproducción es privada.')
            }
            
            
        }
        catch(error){
            res.status(400).json(error.message);
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
            res.status(400).json(error.message);
        }
        
    }

}


export {
    PlaylistController
}