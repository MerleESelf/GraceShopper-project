//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Poster = require("./models/Poster");
const Order = require("./models/Order");
const CartDetail = require("./models/CartDetail");

//associations could go here!

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(CartDetail);
CartDetail.belongsTo(Order);
Poster.hasMany(CartDetail);
CartDetail.belongsTo(Poster);

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
