import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
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



const userRepository = {

    async findAll() {
        const users = await User.find({}).exec();
        return users;
    },

    async createUser(newUser) {
        const usuario = new User({
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
    userRepository
}
