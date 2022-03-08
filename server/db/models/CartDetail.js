const Sequelize = require('sequelize');
const db = require('../db');

const CartDetail = db.define('cartDetail', {
	quantity: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0,
		},
	},
});

module.exports = CartDetail;
