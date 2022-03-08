//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Poster = require('./models/Poster');
const Order = require('./models/Order');
const CartDetail = require('./models/CartDetail');

//associations could go here!

// User.belongsToMany(Poster, { through: 'UserPoster' });
// Poster.belongsToMany(User, { through: 'UserPoster' });
// User.hasMany(Order);
// Order.belongsTo(User);

// Poster.belongsToMany(CartDetail, { through: "PosterCartDetail" });
// CartDetail.belongsToMany(Poster, { through: "PosterCartDetail" });
// Poster.hasMany(CartDetail)

// Order.hasOne(CartDetail);

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(CartDetail);
CartDetail.belongsTo(Order);
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
