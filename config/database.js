const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/cars';

exports.connect = () => {
	mongoose
		.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Successfully connected to database');
		})
		.catch((error) => {
			console.log('database connection failed. exiting now...');
			console.error(error);
			process.exit(1);
		});
};
