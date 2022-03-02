const Sequelize = require('sequelize');
const db = require('../db');

const CartDetail = db.define('cartDetail', {
quantityTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 1
}
})


module.exports = CartDetail;