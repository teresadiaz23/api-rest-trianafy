import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Tiene que introducir el título de la canción']
      },
    artist: {
        type: String,
        required: [true, 'Tiene que introducir el nombre del cantante o grupo']
      },
    album: {
        type: String,
        required: [true, 'Tiene que introducir el nombre del álbum']
      },
    year: {
        type: String,
        required: [true, 'Tiene que introducir el año de publicación del album']
      }
});

const Song = mongoose.model('Song', songSchema);

const SongRepository = {

    async findAll() {
        return await Song.find().exec();
    },

    async findById(id) {
        const song = await Song.findById(id).exec();
        return song != null ? song : undefined;
    },

    async create(newSong) {
        const song = new Song({
            title: newSong.title,
            artist: newSong.artist,
            album: newSong.album,
            year: newSong.year
        });

        const result = await song.save();
        return result;
    },

    async updateById(id, modifiedSong) {
        const song = await Song.findById(id);

        if(song == null) {
            return undefined;
        }
        else{
            return await Object.assign(song, modifiedSong).save();
        }
    },

    async delete(id) {
        await Song.findByIdAndRemove(id).exec();
    }
    
    
}


export {
    Song,
    SongRepository
}



