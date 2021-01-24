import "dotenv/config.js";
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User, UserRepository, toDto } from "../../models/user.js";
import bcrypt from 'bcryptjs';


passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
}, async (username, password, done) => {

    try{
        const user = await UserRepository.findByUsername(username);
        if(user == undefined){
            return done(null, false);
        }
        else if(!bcrypt.compareSync(password, user.password)){
            return done(null, false);
        }
        else{
            return done(null, toDto(user));
        }
    }
    catch (err) {
        console.log(err);
    }
    
    // user.then(u => {
    //     if(u == undefined){
    //         return done(null, false);
    //     }
    //     else if(!bcrypt.compareSync(password, user.password)){
    //         return done(null, false);
    //     }
    //     else{
    //         return done(null, user); //Quitar que se muestre la contraseña
    //     }
    // }).catch(error => console.log(error));
    
}));


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: [process.env.JWT_ALGORITHM]
};

passport.use('token', new JwtStrategy(opts, (jwt_payload, done) => {
    const user_id = jwt_payload.sub;
    const user = UserRepository.findById(user_id);
    // user.then(u => {
    //     if(u == undefined){
    //         return done(null, false);
    //     }
    //     else{
    //         return done(null, user);
    //     }
    // });
    if(user == undefined){
        return done(null, false);
    }
    else{
        return done(null, user);
    }

}));

export const password = () => (req, res, next) => 
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if(err){
            return res.status(400).json(err);
        }
        else if (err || !user){
            return res.status(401).end()
        }

        req.logIn(user, {session: false}, (err) => {
            if(err) return res.status(401).end()
            next()
        })
    })(req, res, next);



export const token = () => (req, res, next) =>
    passport.authenticate('token', {session:false}, (err, user, info) => {
        if(err || !user) {
            return res.status(401).end();
        }
        req.logIn(user, {session: false}, (err) => {
            if(err) return res.status(401).end()
            next()
        })
    })(req, res, next);


export default passport;

















