import mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
    name: String,
    description: String,
    // user: { type: ObjectId, ref: 'User' },
    // songs: [{ type: ObjectId, ref: 'Song' }]
});

const Playlist = mongoose.model('Playlist', listSchema);

const PlaylistRepository = {

    async findAll() {
        const list = await Playlist.find({}).exec();
        return list; 
    }
}

