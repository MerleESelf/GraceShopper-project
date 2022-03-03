const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
	isComplete: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	moneyTotal: {
		type: Sequelize.INTEGER,
		default: 0
	},
});

module.exports = Order;
