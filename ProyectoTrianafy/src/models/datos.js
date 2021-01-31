import "dotenv/config.js";
import bcrypt from 'bcryptjs';
import { Song } from "./song.js";
import { User } from "./user.js";
import { Playlist } from "./playlist.js";

let canciones = [
    new Song({
      title: "Antes",
      artist: "Anuel AA & Ozuna",
      album: "Los Dioses",
      year: "2021"
    }),
    new Song({
      title: "Rojo",
      artist: "J Balvin",
      album: "Colores",
      year: "2020"
    }),
    new Song({
      title: "In Your Eyes",
      artist: "The Weeknd",
      album: "After Hours",
      year: "2020"
    }),
    new Song({
      title: "Break My Heart",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      year: "2020"
    }),
    new Song({
      title: "willow",
      artist: "Taylor Swift",
      album: "evermore",
      year: "2020"
    }),
    new Song({
      title: "Rain On Me",
      artist: "Lady Gaga & Ariana Grande",
      album: "Chromatica",
      year: "2020"
    })

];

let usuarios = [
    new User({
        fullname: "Teresa Díaz",
        username: "tdiaz",
        email: "teresa@gmail.com",
        password: bcrypt.hashSync("12345678", parseInt(process.env.BCRYPT_ROUNDS))
    })
];

let playlists = [
    new Playlist({
        name: "Éxitos de hoy",
        description: "Baladas relajantes, llenapistas para no parar de bailar, pop colorido o el nuevo hip-hop."+
        "En esta playlist están incluidas las canciones que más suenan en todo el mundo ahora mismo.",
        songs: [canciones[0], canciones[1]],
        user: usuarios[0],
        public: true
    }),
    new Playlist({
        name: "Lista VIP: Pop",
        description: "En esta lista se encuentan las canciones pop internacional más escuchadas.",
        songs: [canciones[2], canciones[3]],
        user: usuarios[0],
        public: false
    })
];



export {
    canciones,
    usuarios,
    playlists
}