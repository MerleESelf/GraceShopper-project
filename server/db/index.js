//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Poster = require('./models/Poster');
const Order = require('./models/Order');
const CartDetail = require('./models/CartDetail');

//associations could go here!

User.belongsToMany(Poster, { through: 'UserPoster' });
Poster.belongsToMany(User, { through: 'UserPoster' });
User.hasMany(Order);
Order.belongsTo(User);
Poster.belongsToMany(CartDetail, { through: 'PosterCartDetail' });
CartDetail.belongsToMany(Poster, { through: 'PosterCartDetail' });
Order.hasOne(CartDetail);
CartDetail.belongsTo(User);

/** please don't delete this A.lin
============================================
// User.hasMany(Order);
// User.hasOne(CartDetail);

// Poster.belongsToMany(CartDetail, { through: 'PosterCartDetail' });
// Poster.belongsToMany(Order, { through: 'PosterOrder' });

// Order.belongsTo(User, { through: 'Order_User' });
// Order.hasMany(Poster);

// CartDetail.belongsTo(User, { through: 'CartDetail_User' });
// CartDetail.hasMany(Poster);
============================================
*/
// Order.beforeValidate(order=> {
// 	if (!order.id) {
// 	  throw new Error('');
// 	}
//   });

// CartDetail.beforeValidate( order=> {
// 	if (Poster.quantity < CartDetail.quantityTotal) {
// 	  throw new Error('Not enough in stock');
// 	}
//   });

module.exports = {
	db,
	models: {
		User,
		Poster,
		Order,
		CartDetail,
	},
};
