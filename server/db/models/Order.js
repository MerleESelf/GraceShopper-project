const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
// cart should have both user and poster info attached to it. 
// when a user adds something to card, a new association is created 
//lifecycle hook? for before or after update to have the quantities and prices update, OK theres a change coming up with our model
// these hooks will get into posters and cart
// the order summary component is a react component using what we already have in this model 
// we will have cart will belog 
moneyTotal: {
    type: Sequelize.DECIMAL(10,2),
    default: 0
},
isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
}
})

module.exports = Order;