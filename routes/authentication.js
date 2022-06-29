const express = require('express');
var router = express.Router();
const UserRepostiry = require('./../repositories/user_repository');

router.post('/register', async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!(email && password && firstName && lastName)) {
			return res.status(400).send('All input is required');
		}

		const oldUser = await UserRepostiry.getUserByEmail(email);
		if (oldUser) {
			return res.status(409).send('User Already Exist. Please Login');
		}

		const user = await UserRepostiry.registerUser(req.body);

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

		const user = await UserRepostiry.login(req.body);
		if (user == null) {
			return res.status(400).send('Invalid Credentials');
		}

		return res.status(200).json(user);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
