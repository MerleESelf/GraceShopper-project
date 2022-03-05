const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

const isAdmin = async (req, res, next) => {
  try {
    const token = req.query.boo;
    const user = await User.findByToken(token);
    req.isAdmin = user.isAdmin;
    next();
  } catch (error) {
    next(error);
  }
};

router.get("/", isAdmin, async (req, res, next) => {
  try {
    if (req.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        where: {isAdmin: false},
        attributes: ["id", "username"],
      });
      res.json(users);
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    next(err);
  }
});
