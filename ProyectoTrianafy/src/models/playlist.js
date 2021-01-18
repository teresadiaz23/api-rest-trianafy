import mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
    name: String,
    description: String,
    user_id: mongoose.ObjectId,
    songs: ['Song']
});

const Playlist = mongoose.model('Playlist', listSchema);

const playlistRepository = {

    async findAll() {
        const list = await Playlist.find({}).exec();
        return list; 
    }
}

    
    