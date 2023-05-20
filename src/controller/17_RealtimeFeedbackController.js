// AGPL Lizenz
// #####################################################
// programmed (by) =>	{ 🔥🔥🔥 Almir Ajradini 🔥🔥🔥 }
// #####################################################
// 04.05.2022 @ BBBaden
//

// import feedback model from separate directory
const Feedback = require("../models/feedback");


const data = {
	lesson1: [
		{
			feedback: "Zu viel Stoff",
			rating: "3",
		},
		{
			feedback: "Zu schwer",
			rating: "2",
		},
		{
			feedback: "Verstehe nix, aber gefällt mir",
			rating: "4",
		},
	],
	lesson2: [
		{
			feedback: "ganz gut",
			rating: "4",
		},
		{
			feedback: "Sehr interessant",
			rating: "4",
		},
		{
			feedback: "Super",
			rating: "5",
		},
	],
};

const template = {
	feedback: "",
	rating: "",
};

module.exports = {
	async getAll(req, res) {

		try {
			var feedbacks = await Feedback.find().exec();
			res.render("realtimefeedback", { feedbacks: feedbacks });
		} catch (err) {
			console.log(err);
		}

	},

	async getOneDetail(req, res) {
		try {
			if (data[req.params.id]) {
				one = data[req.params.id];
				res.json(one);
			} else {
				res.json({
					err: true,
					msg: "id not found",
				});
			}
		} catch (error) {
			console.error(error);
			res.json({
				err: true,
				msg: "Details of ID not found",
			});
		}
	},

	async getTemplate(req, res) {
		res.json(template);
	},

	async addOne(req, res) {

		var newFeedback = new Feedback({
			userID: req.user.username,
			class: req.body.classContent,
			feedback: req.body.feedbackContent,
			rating: req.body.ratingContent
		});
	
		try {
			await newFeedback.save();
			res.redirect("/realtimefeedback");
		} catch (err) {
			req.flash("error", "Bitte alle Felder ausfüllen!");
			res.redirect("/realtimefeedback");
		}

	},
};
