import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    fullname: {
        type: String,
        required: true
      },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        message: 'Ese usuario ya existe'
      },
    email: {
        type: String,
        required: true,
        unique: true,
        message: 'Ese email ya existe'
      },
    password: {
        type: String,
        required: true,
        minlength: 8
      }
});


const User = mongoose.model('User', userSchema);

const emailExists = async (email) => {
    const result = await User.findOne({'email': email}).exec();
    return result != null ? true : false ;

}

const usernameExists = async (username) => {
    const user = await User.findOne({'username': username}).exec();
    return user != null ? true : false;

}

const toDto = (user) => {
    return {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email
    }
}



const UserRepository = {

    async findAll() {
        const users = await User.find({}, '_id fullname username email').exec();
        return users;
    },

    async findById(id) {
        const user = await User.findById(id).exec();
        return user != null ? user : undefined;
    },

    async findByUsername(username) {
        const user = await User.findOne({'username': username}).exec();
        return user != null ? user : undefined;
    },

    async create(newUser) {
        const usuario = new User({
            //_id: new mongoose.Types.ObjectId(),
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        });

        const result = await usuario.save();

        return {
            id: result.id,
            fullname: result.fullname,
            username: result.username,
            email: result.email
        }
    }


}

// let yo = new User({
//     _id: new mongoose.Types.ObjectId(),
//     fullname: "Teresa Díaz",
//     username: "tdiaz",
//     email: "teresa@gmail.com",
//     password: "1234"
// });

// yo.save(err => {
//     if(err) throw err;
//     console.log("Guardado con éxito");
// })

export {
    User,
    emailExists,
    usernameExists,
    toDto,
    UserRepository
}
