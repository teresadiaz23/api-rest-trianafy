import mongoose from 'mongoose';
const { Schema } = mongoose;

const listSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tiene que introducir el nombre de la lista de reproducción']
      },
    description: {
        type: String,
        required: [true, 'Tiene que introducir la descripción de la lista de reprodución']
      },
    user: { type: mongoose.ObjectId, ref: 'User' },
    songs: [{ type: mongoose.ObjectId, ref: 'Song' }],
    public: {
        type: Boolean,
        required: [true, 'Tiene que indicar si la lista es pública (true) o privada (false)']
      }
});

const Playlist = mongoose.model('Playlist', listSchema);

const PlaylistRepository = {

    async findAll() {
        const list = await Playlist.find()
        .populate('songs','title artist')
        .exec();
        return list; 
    },

    async findById(id) {
        return await Playlist
        .findById(id)
        .populate('songs','title artist album year')
        .exec();
    },

    async create(newPlaylist) {
        const list = new Playlist({
            
            name: newPlaylist.name,
            description: newPlaylist.description,
            user: newPlaylist.user,
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


export {
    Playlist,
    PlaylistRepository
}