const router = require("express").Router();
module.exports = router;

// adding access to poster routes below
router.use("/posters", require("./posters"));
router.use("/posters", require("./order"));

//router.use("/cart", require("./cart"));
router.use("/order", require("./order"));

//add access to admin poster routes below
router.use("/admin/posters", require("./adminPoster"));
router.use("/admin/users", require("./users"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
