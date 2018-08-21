import * as passport from 'passport';
import * as passportJWT from "passport-jwt";
import { getManager } from "typeorm";
import { UserModel } from '../models/userModel';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {
        const manager = getManager(); // or connection.manager

        var user = manager.findOne(UserModel, { "profile.email": email })
            // UserRepository.findOne({ 'profile.email': email })
            // var user = UserRepository.findOne({ _id: '5b6c6c85cbbfd77e602eef1c' })
            .then(user => {
                if (!user.comparePassword(password)) {
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }

                return cb(null, user, { message: 'Logged In Successfully' });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, cb) {

        const manager = getManager(); // or connection.manager

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return manager.findOne(UserModel, { _id: jwtPayload._id })// UserRepository.findById(jwtPayload._id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

export default passport;