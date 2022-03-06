const router = require('express').Router();
const { models: { Poster,User,Order,CartDetail }} = require('../db')


//GET /api/order/:userId
router.get("/:userId", async (req, res, next) => {
    try {
        console.log('in the router, userId', req.params.userId)
      const order = await Order.findAll({
          where: {
              userId: req.params.userId,
              isComplete: false
            }});
      const currentOrderId = JSON.stringify(order[0].id)
      const orderCarts = await Order.findByPk(currentOrderId, {
        include: [
          {
            model: CartDetail,
            where: {orderId: currentOrderId}
          },
        ],
      })
      const posters = await CartDetail.findAll({
          where: {
              orderId: currentOrderId
          }, 
          include: Poster,
      })
    //   const ordercarts = JSON.stringify(orderCarts)
      console.log('posters', JSON.stringify(posters))
      res.send(posters);
    } catch (error) {
      next(error);
    }
  });

//GET /api/order/:id/:userId
router.get("/:id/:userId", async (req, res, next) => {
    try {
      const order = await Order.findbyPK(req.params.id);
      res.send(order);
    } catch (error) {
      next(error);
    }
  });

//PUT /api/order/:id/:userId
router.put("/:id/:userId", async (req, res, next) => {
    try {
      const completeOrder = await Order.update(
        { isComplete: true },
        { where: { id: req.params.id } }
      )
      res.send(completeOrder);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
