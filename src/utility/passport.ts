import * as passport from 'passport';
import { getManager } from "typeorm";
import { UserModel } from '../models/userModel';
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT, StrategyOptions } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import * as express from 'express';
import { Constants } from './global';

export default class PassportCustom {

    public static init(app: express.Application) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
            async function (email: String, password: String, cb) {

                const manager = getManager();

                var user = await manager.findOne(UserModel, { profile: { email: email } }) // "profile.email": email })
                if (!user || !user.comparePassword(password)) {
                    return cb(null, false, { message: Constants.login_fail_text });
                }

                return cb(null, user, { message: Constants.login_ok_text });
            }
        ));

        passport.use(new JWTStrategy({ jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey: 'your_jwt_secret' },
            function (jwtPayload, cb) {

                return cb(null, jwtPayload);

                //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
                // const manager = getManager();
                // return manager.findOne(UserModel, { _id: jwtPayload._id })// UserRepository.findById(jwtPayload._id)
                //     .then(user => {
                //         return cb(null, user);
                //     })
                //     .catch(err => {
                //         return cb(err);
                //     });
            }
        ));
    }
}