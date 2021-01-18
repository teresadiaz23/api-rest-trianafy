import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
    title: String,
    artist: String,
    album: String,
    year: String
});

const Song = mongoose.model('Song', songSchema);