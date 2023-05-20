var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
const SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, required:false},
    createdAt:{type:Date, default:Date.now}
});

userSchema.pre("save", function(done){
    var user = this;

    if(!user.isModified("password")) {
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, function(err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});

userSchema.methods.checkPassword = async function(guess){
    if (this.password != null) {
        var isMatch = await bcrypt.compare(guess, this.password);
        return isMatch;
    }
    return false;
};

var User = mongoose.model("User", userSchema);

module.exports = User;