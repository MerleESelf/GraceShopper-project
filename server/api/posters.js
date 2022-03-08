// this should be merged with the allPosters API because they share the same /api/posters

const router = require("express").Router();
module.exports = router;
const {
  models: { Poster, User, Order, CartDetail },
} = require("../db");
module.exports = router;

// route for all posters
router.get("/", async (req, res, next) => {
  try {
    const allPosters = await Poster.findAll();
    res.send(allPosters);
  } catch (error) {
    next(error);
  }
});
// const isLoggedIn = async (req, res, next) => {
//   try {
//     const token = req.body.params;
//     const user = await User.findByToken(token);
//     req.body = req.body.params.user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
// headers: {
//   'Authorization': 'Bearer ' + localStorage.getItem('token')
// }
router.get("/:id", async (req, res, next) => {
  try {
    const poster = await Poster.findByPk(req.params.id);
    if (!poster) {
      let err = new Error("No cats or hats or posters here!");
      err.status = 404;
      next(err);
    } else {
      res.send(poster);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    console.log("numbie", this.props.isLoggedIn);
    const poster = await Poster.findByPk(req.params.id);
    poster.quantity--;
    await poster.save();
    res.send(poster);
    if (req.isLoggedIn) {
      console.log(req.isLoggedIn);
      const order = await OrderfindAll({
        where: {
          userId: req.isLoggedIn,
          isComlete: false,
        },
      });
      if (order) {
        const currPoster = await CartDetail.findAll({
          where: {
            orderId: order.id,
            posterId: req.params.id,
          },
        });
        if (currPoster) {
          currPoster.update({ quantity: quantity++ });
          await currPoster.save();
        } else {
          const newItem = await CartDetail.create({
            quantity: 1,
          });
          newItem.belongsTo(order);
          await newItem.save();
        }
      }
      if (!order) {
        const newOrder = await Order.create({
          userId: req.isLoggedIn,
        });
        const newItem = await CartDetail.create({
          quantity: 1,
        });
        newItem.belongsTo(newOrder);
        await newOrder.save();
        await newItem.save();
      }
    }
  } catch (error) {
    next(error);
  }
});

// headers and authoriziation to access user info
// included in .post or .get
// in localstorage
// look up axios headers
