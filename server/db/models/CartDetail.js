const Sequelize = require('sequelize');
const db = require('../db');

const CartDetail = db.define('cartDetail', {
	price: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0,
		},
	},
	quantity: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0,
		},
	},
});

module.exports = CartDetail;
