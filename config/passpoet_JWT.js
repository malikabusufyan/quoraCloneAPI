const passport = require("passport");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "hpEOHTnnMS72fxBhypqFHuwTq3hnM4GT",
};
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      //The JWT_Payload will give us the user detail from JWT token so we will take
      //the email out from there for authorization
      const user = await User.findOne({ email: jwt_payload.email });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log("Error", error);
      return done(error, false);
    }
  })
);
