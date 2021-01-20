import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    fullname: String,
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result > 0;
}

const usernameExists = (username) => {
    let usernames = users.map(user => user.username);
    return usernames.includes(username);
}



const UserRepository = {

    async findAll() {
        const users = await User.find({}).exec();
        return users;
    },

    async findById(id) {
        const user = await User.findById(id).exec();
        return user != null ? user : undefined;
    },

    async findByUsername(username) {
        const user = await User.find({'username': username}).exec();
        return user != null ? user : undefined;
    },

    async create(newUser) {
        const usuario = new User({
            _id: new mongoose.Types.ObjectId(),
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

export {
    User,
    emailExists,
    usernameExists,
    UserRepository
}
