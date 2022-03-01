const Sequelize = require('sequelize');
const db = require('../db');

const Poster = db.define('poster', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	creator: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	price: {
		type: Sequelize.DECIMAL(10, 2),
		allowNull: false,
	},
	size: {
		type: Sequelize.ENUM('54" x 36"', '36" x 24"', '24" x 16"', '18" x 12"'),
		defaultValue: '18" x 12"',
	},
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 100,
	},
	description: {
		type: Sequelize.STRING,
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue: 'https://loremflickr.com/320/240',
	},
});

module.exports = Poster;