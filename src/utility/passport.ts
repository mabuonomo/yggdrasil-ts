import * as passport from 'passport';
import { getManager } from "typeorm";
import { UserModel } from '../models/userModel';
import { Strategy as JWTStrategy, ExtractJwt as ExtractJWT, StrategyOptions } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export default class PassportCustom {

    public static init(app: express.Application) {
        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
            async function (email: String, password: String, cb) {

                const manager = getManager(); // or connection.manager

                var user = await manager.findOne(UserModel, { "profile.email": email })
                if (!user.comparePassword(password)) {
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }

                return cb(null, user, { message: 'Logged In Successfully' });
            }
        ));

        passport.use(new JWTStrategy({ jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey: 'your_jwt_secret' },
            function (jwtPayload, cb) {

                return cb(null, jwtPayload);

                //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
                // const manager = getManager(); // or connection.manager
                // return manager.findOne(UserModel, { _id: jwtPayload._id })// UserRepository.findById(jwtPayload._id)
                //     .then(user => {
                //         return cb(null, user);
                //     })
                //     .catch(err => {
                //         return cb(err);
                //     });
            }
        ));

        /* app.post('/auth', function (req, res, next) {

            passport.authenticate('local', { session: false }, (err, user, info) => {
                if (err || !user) {
                    return res.status(400).json({
                        message: 'Err - Something is not right',
                        err: err,
                        user: user
                    });
                }

                req.login(user, { session: false }, (err) => {
                    if (err) {
                        res.send(err);
                    }
                    // generate a signed son web token with the contents of user object and return it in the response
                    const token = jwt.sign(JSON.stringify(user), 'your_jwt_secret');
                    return res.json({ user, token });
                });

            })(req, res, next);
        }); */
    }
}