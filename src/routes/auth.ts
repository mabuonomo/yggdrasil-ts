const express_auth = require('express');
const router_auth = express_auth.Router();
import * as jwt from 'jsonwebtoken';
import passport from "../utility/passport";

/* POST login. */
router_auth.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {

    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
      return res.json({ user, token });
    });

  })(req, res);
});

module.exports = router_auth;