var passport = require("passport");
var flash = require("connect-flash");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/user");

module.exports = function() {
    passport.serializeUser((user, done) => { 
        done(null, user._id);
    });

    passport.deserializeUser( async (id, done) => {
        try {
            const user = await User.findById(id);
        done(null, user);
        } catch(err) {
            done(err, user);
        }
    });

    passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async function(req, email, password, done) {
        try {
            const user = await User.findOne({email:email});

            

            if (!user) {
                req.flash("error", "Keine Benutzer mit dieser E-Mail.");
                
                return done(null, false);
            }
            
            const isMatch = await user.checkPassword(password);
            if (isMatch){
                    return done(null, user);
            } else {
                req.flash("error", "Ungültiges Passwort");
                return done(null, false)
            }

        } catch (err) {
            return done(err);
        }
    }));
};