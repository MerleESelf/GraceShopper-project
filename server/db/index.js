//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Poster = require('./models/Poster');

//associations could go here!
User.belongsToMany(Poster, { through: 'UserPoster' });
Poster.belongsToMany(User, { through: 'UserPoster' });

module.exports = {
	db,
	models: {
		User,
		Poster,
	},
};
