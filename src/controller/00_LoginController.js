// AGPL Lizenz
// #####################################################
// programmed (by) =>	{ 🔥🔥🔥 Almir Ajradini 🔥🔥🔥 }
// #####################################################
// 04.05.2022 @ BBBaden
//

// Bispieldaten fürs Login die aus einer DB kommen könnten
const loginDB = {
	almir: "Teacher.1",
	ajradini: "Teacher.2",
};

// app.post("/login", function (req, res) {
// 	if (loginDB[req.body.username] == req.body.password) {
// 		res.json({ err: false, login: true });
// 	} else {
// 		res.json({ err: true, msg: "wrong user credentials" });
// 	}
// });


const express = require("express");
var passport = require("passport");
var setUpPassport = require("../setuppassport");
// import user model from separate directory
var User = require("../models/user");
setUpPassport();
const app = express();
app.use(passport.initialize());
app.use(passport.session());

// TODO review commented code and delete or keep

module.exports = {
	async login(req, res, next) {

		passport.authenticate("login", {
			successRedirect: "/",
			failureRedirect: "/login",
			failureFlash: true
		})(req, res, next);

		/*
		setTimeout(() => {
			try {
				if (req.body.username != undefined && loginDB[req.body.username] == req.body.password) {
					res.json({
						err: false,
						login: true,
					});
				} else {
					res.json({
						err: true,
						login: false,
						msg: "wrong user credentials",
					});
				}
			} catch (error) {
				console.error(error);
				res.json({
					err: true,
					msg: "server error",
				});
			}
		}, 1453);
		*/
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

		/*
		// slowdown login process
		setTimeout(() => {
			try {
				if (!loginDB[req.body.username]) {
					loginDB[req.body.username] = req.body.password;
					res.json({
						err: false,
						register: true,
						[req.body.username]: loginDB[req.body.username],
					});
				} else {
					res.json({
						err: true,
						register: false,
						msg: "try other username",
					});
				}
			} catch (error) {
				console.error(error);
				res.json({
					err: true,
					msg: "server error",
				});
			}
		}, 1453);*/
	}
	/*
	,

	async getuserlist(req, res) {
		res.json(loginDB);
	},*/
};
