//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Poster = require('./models/Poster');
const Cart = require('./models/Cart');

//associations could go here!
User.belongsToMany(Poster, { through: 'UserPoster' });
Poster.belongsToMany(User, { through: 'UserPoster' });
User.hasOne(Cart);
Poster.belongsToMany(Cart, { through: 'CartPoster' });
Cart.belongsToMany(Poster, { through: 'CartPoster' });


module.exports = {
	db,
	models: {
		User,
		Poster,
		Cart,
	},
};
