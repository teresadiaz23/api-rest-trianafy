import { SongRepository } from "../models/song.js";

const SongController = {
    allSongs: async (req, res) => {
        const result = await SongRepository.findAll();
        if(Array.isArray(result) && result.length > 0){
            res.json(result);
        }
        else{
            res.sendStatus(404);
        }
    },

    songById: async (req, res) => {
        let song = await SongRepository.findById(req.params.id);
        if(song != undefined){
            res.json(song);
        }
        else{
            res.sendStatus(404);
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
            //res.status(201).json(song);
            if (song) {
                res.status(201).json(song);
            }
            else{
                res.sendStatus(404);
            }
        }
        catch (err){
            console.log(err);

        } 
    },


    updateSong: async (req, res) => {

        try{
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
        catch(err){
            console.log(err);
        }
        
    },

    deleteSong: async (req, res) => {
        await SongRepository.delete(req.params.id);
        res.sendStatus(204);
    }

    

}

export {
    SongController
}

