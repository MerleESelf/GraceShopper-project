//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Poster = require('./models/Poster');
const Order = require('./models/Order');
const CartDetail = require('./models/CartDetail');

User.hasMany(Order);
Order.belongsTo(User); 
Order.hasMany(CartDetail);
CartDetail.belongsTo(Order)

Poster.hasMany(CartDetail);
CartDetail.belongsTo(Poster);



module.exports = {
	db,
	models: {
		User,
		Poster,
		Order,
		CartDetail,
	},
};
