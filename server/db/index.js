//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Poster = require('./models/Poster');
const Order = require('./models/Order');
const CartDetail = require('./models/CartDetail');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Poster.belongsToMany(Order, { through: CartDetail });
Order.belongsToMany(Poster, { through: CartDetail });

module.exports = {
	db,
	models: {
		User,
		Poster,
		Order,
		CartDetail,
	},
};
