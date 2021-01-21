import mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    user: { type: mongoose.ObjectId, ref: 'User' },
    songs: [{ type: mongoose.ObjectId, ref: 'Song' }]
});

const Playlist = mongoose.model('Playlist', listSchema);

const PlaylistRepository = {

    async findAll() {
        const list = await Playlist.find({}).exec();
        return list; 
    }
}

