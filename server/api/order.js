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
      const  openOrder = await Order.findByPk(currentOrderId, {
        // include: [
        //   {
        //     model: CartDetail,
        //     where: {orderId: currentOrderId},
        //     include: Poster,
        //   },
        // ],
      })
      const cartPosters = await CartDetail.findAll({
          where: {
              orderId: currentOrderId
          }, 
          include: Poster,
      })
      res.send({
        openOrder,
        cartPosters
    })
    //   res.send(posters);
    } catch (error) {
      next(error);
    }
  });

//GET /api/order/:userId/:orderId
router.get("/:userId/:orderId", async (req, res, next) => {
    try {
      console.log("API get complete order", req.params)
      const order = await Order.findByPk(req.params.orderId)
      res.send(order);
    } catch (error) {
      next(error);
    }
  });

//PUT /api/order/:userId/:orderId
router.put("/:userId/:orderId", async (req, res, next) => {
    try {
      console.log("API get complete order", req.params)
      const completeOrder = await Order.update(
        { isComplete: true },
        { where: { id: req.params.orderId } }
      )
      res.send(completeOrder);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
