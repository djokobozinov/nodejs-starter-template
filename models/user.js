const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	firstName: { type: String, default: null },
	lastName: { type: String, default: null },
	password: { type: String },
	token: { type: String },
});

module.exports = mongoose.model('user', userSchema);
