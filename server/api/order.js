const router = require("express").Router();
const {
  models: { Poster, User, Order, CartDetail },
} = require("../db");

router.put("/", async (req, res, next) => {
  try {
    const poster = await Order.findorCreate({
      where: { username: "sdepold" },
    });
    // where userID =  current  userid - or create an order if one does not exist
    //then create a new Cart Detail row with the poster data and then associate it to the order
    // if order exists, find + update or create cart detail instance of the added  poster
    poster.quantity--;
    await poster.save();
    res.send(poster);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
