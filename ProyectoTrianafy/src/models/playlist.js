import mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
      },
    description: {
        type: String,
        required: true
      },
    user: { type: mongoose.ObjectId, ref: 'User' },
    songs: [{ type: mongoose.ObjectId, ref: 'Song' }],
    public: {
        type: Boolean,
        required: true
      }
});

const Playlist = mongoose.model('Playlist', listSchema);

const PlaylistRepository = {

    async findAll() {
        const list = await Playlist.find()
        //.populate('user')
        .populate('songs','title artist')
        .exec();
        return list; 
    },

    async findById(id) {
        return await Playlist
        .findById(id)
        //.populate('user', '_id')
        .populate('songs','title artist album year')
        .exec();
    },

    async create(newPlaylist) {
        const list = new Playlist({
            //_id: new mongoose.Types.ObjectId(),
            name: newPlaylist.name,
            description: newPlaylist.description,
            public: newPlaylist.public
        });
        
        const result = await list.save();
        return result;
    },

    async updateById(id, editPlaylist) {
        const list = await Playlist.findById(id);
        if(list == null) {
            return undefined;
        }
        else{
            return await Object.assign(list, editPlaylist).save();
        }
    },

    async delete(id) {
        await Playlist.findByIdAndRemove(id).exec();
    }

}

// let pop = new Playlist({
//     _id: new mongoose.Types.ObjectId(),
//     name: "Éxitos Pop",
//     description: "Las canciones más novedosas del pop internacional",
// });

// pop.save(err => {
//     if(err) throw err;
//     console.log("Guardado con éxito");
// })


export {
    Playlist,
    PlaylistRepository
}