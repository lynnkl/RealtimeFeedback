// AGPL Lizenz
// #####################################################
// programmed (by) =>	{ 🔥🔥🔥 Almir Ajradini 🔥🔥🔥 }
// #####################################################
// 04.05.2022 @ BBBaden
//

// Beispieldaten fürs Login die aus einer DB kommen könnten
const loginDB = {
	almir: "Teacher.1",
	ajradini: "Teacher.2",
};


const express = require("express");
var passport = require("passport");
// importiert custom model für passport und user
var setUpPassport = require("../setuppassport");
var User = require("../models/user");
setUpPassport();
const app = express();
app.use(passport.initialize());
app.use(passport.session());



module.exports = {
	async login(req, res, next) {

		passport.authenticate("login", {
			successRedirect: "/",
			failureRedirect: "/login",
			failureFlash: true
		})(req, res, next);


	},

	async register(req, res, next) {
		try {
			var username = req.body.username;
			var email = req.body.email;
			var password = req.body.password;
			
			const user = await User.findOne({ email: email });

			if (user) {
				req.flash("error", "Email bereits registriert!");
				return res.redirect("/register");
			}

			const newUser = new User({
				username: username,
				password: password,
				email: email
			});

			await newUser.save();


			passport.authenticate("login", {
				successRedirect: "/",
				failureRedirect: "/login",
				failureFlash: true
			})(req, res, next);

		} catch (err) {
			next(err);
		}
	}
};
