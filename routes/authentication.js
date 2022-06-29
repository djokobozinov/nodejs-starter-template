const express = require('express');
var router = express.Router();
const User = require('.././models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const token_key = process.env.TOKEN_KEY || 'token_cars';

router.post('/register', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!(email && password && firstName && lastName)) {
			return res.status(400).send('All input is required');
		}

		const oldUser = await User.findOne({ email });
		if (oldUser) {
			return res.status(409).send('User Already Exist. Please Login');
		}

		encryptedPassword = await bcrypt.hash(password, 10);

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

		return res.status(201).json(user);
	} catch (err) {
		console.log(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(400).send('All input is required');
		}

		const user = await User.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ user_id: user._id, email }, token_key, {
				expiresIn: '2h',
			});
			user.token = token;
			return res.status(200).json(user);
		}

		return res.status(400).send('Invalid Credentials');
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
