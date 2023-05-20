var mongoose = require("mongoose");

var feedbackSchema = mongoose.Schema({
    userID: {type: String, required: true},
    class: {type: String, required: true},
    feedback: {type: String, required: true},
    rating: {type: Number, required: true}
});

var Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;