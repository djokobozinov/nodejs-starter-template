const bcrypt = require('bcryptjs');
const User = require('.././models/user');
const jwt = require('jsonwebtoken');
const token_key = process.env.TOKEN_KEY || 'token_cars';

async function getUserByEmail(email) {
	return await User.findOne({ email });
}

async function registerUser({ firstName, lastName, email, password }) {
	const encryptedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({
		firstName,
		lastName,
		email: email.toLowerCase(),
		password: encryptedPassword,
	});
	const token = jwt.sign({ user_id: user._id, email }, token_key, {
		expiresIn: '2h',
	});
	user.token = token;
	return user;
}

async function login({ email, password }) {
	const user = await User.findOne({ email });
	if (user && bcrypt.compare(password, user.password)) {
		const token = jwt.sign({ user_id: user._id, email }, token_key, {
			expiresIn: '2h',
		});
		user.token = token;
		return user;
	}
	return null;
}

module.exports = { getUserByEmail, registerUser, login };
