// this should be merged with the allPosters API because they share the same /api/posters

const router = require("express").Router();
module.exports = router;
const {
  models: { Poster },
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
    const poster = await Poster.findByPk(req.params.id);
    poster.quantity--;
    await poster.save();
    res.send(poster);
  } catch (error) {
    next(error);
  }
});
