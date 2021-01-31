import { SongRepository } from "../models/song.js";

const SongController = {
    allSongs: async (req, res) => {
        try{
            const result = await SongRepository.findAll();
            if(Array.isArray(result) && result.length > 0){
                res.json(result);
            }
            else{
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.status(400).json(error.message);
        }
        
    },

    songById: async (req, res) => {

        try{
            let song = await SongRepository.findById(req.params.id);
            if(song != undefined){
                res.json(song);
            }
            else{
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.status(400).json(error.message);
        }
        
    },

    newSong: async (req, res) => {

        try{
            let song = await SongRepository.create({
                title: req.body.title,
                artist: req.body.artist,
                album: req.body.album,
                year: req.body.year
            });
            
            if (song) {
                res.status(201).json(song);
            }
            else{
                res.sendStatus(404);
            }
        }
        catch (error){
            res.status(400).json(error.message);

        } 
    },


    updateSong: async (req, res) => {

        try{
            if(!req.body.id){
                let song = await SongRepository.updateById(req.params.id, {
                    title: req.body.title,
                    artist: req.body.artist,
                    album: req.body.album,
                    year: req.body.year
                });
                
                if(song != undefined) {
                    res.status(204).json(song);
                }
                else{
                    res.sendStatus(404);
                }

            }
            else{
                res.sendStatus(409);
            }
            
        }
        catch(error){
            res.status(400).json(error.message);
        }
        
    },

    deleteSong: async (req, res) => {
        try{
            await SongRepository.delete(req.params.id);
            res.sendStatus(204);
        }
        catch(error) {
            res.status(400).json(error.message);
        }
        
    }

}

export {
    SongController
}

