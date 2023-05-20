var ensureAuth = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in.");
        res.redirect("/login");
    }
};

module.exports = {ensureAuthenticated: ensureAuth};