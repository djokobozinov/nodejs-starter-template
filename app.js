require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const auth = require('./middleware/auth');

app.use(express.json());
app.use(routes);

app.get('/welcome', auth, (req, res) => {
	res.status(200).send('Welcome!');
});

app.use('*', (req, res) => {
	res.status(404).json({
		success: 'false',
		message: 'Page not found',
		error: {
			statusCode: 404,
			message: 'Page not found!',
		},
	});
});

module.exports = app;
