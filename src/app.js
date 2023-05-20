// AGPL Lizenz
// #####################################################
// programmed (by) =>	{ 🔥🔥🔥 Almir Ajradini 🔥🔥🔥 }
// #####################################################
// 04.05.2022 @ BBBaden
//

const loginController = require("./controller/00_LoginController");
const realtimeFeedbackController = require("./controller/17_RealtimeFeedbackController");

const express = require("express");
const cors = require("cors");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");

// import params from separate file
var params = require("./params");

var setUpPassport = require("./setuppassport");

var ensureAuthenticated = require("./authentication/auth").ensureAuthenticated;

mongoose.connect(params.DBCONNECTION, { useUnifiedTopology: true, useNewUrlParser: true });
setUpPassport();

const app = express();
const port = 3000;

app.use(express.static('public'))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: "thisismysuperdupersecret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ========================================= Zugangspunkte ====================================================

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.info = req.flash("info");
	next();
});

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/info", (req, res) => {
	res.send({
		// TODO Author ändern
		Author: "Almir Ajradini",
		Name: "LB MM291",
		Company: "BBBaden",
	});
});

app.get("/login", (req, res) => {
		res.render("login");
	});

app.get("/register", (req, res) => {
	res.render("register");
});

app.get("/logout", (req, res) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});


// ========================================= Register/Login ===================================================
{
	
	app.post("/login", loginController.login);
	app.post("/register", loginController.register);

	// TODO review commented code to delete or keep

	/*
	app.get("/register", (req, res) => {
		res.json({
			user: "some free username",
			password:
				"your super secret password. I swear to god I can't read your password after I have encrypted it.",
		});
	});
	

	app.get("/getuserlist", loginController.getuserlist);
	*/
}

// ========================================= 17 Realtime_Feedback =============================================

app.get("/realtimefeedback", ensureAuthenticated, realtimeFeedbackController.getAll);
app.get("/realtimefeedback/getall", ensureAuthenticated, realtimeFeedbackController.getAll);
app.post("/realtimefeedback/addOne", ensureAuthenticated, realtimeFeedbackController.addOne);

app.get("/realtimefeedback/detail/:id", realtimeFeedbackController.getOneDetail);
app.get("/realtimefeedback/template", realtimeFeedbackController.getTemplate);

// ======================================== Start Server ======================================================



app.listen(port, () => {
	console.log(`API listening @ http://localhost:${port}`);
});
