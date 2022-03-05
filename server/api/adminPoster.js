// this should be merged with the allPosters API because they share the same /api/posters

const router = require("express").Router();
module.exports = router;
const {
  models: { Poster, User },
} = require("../db");
module.exports = router;

const isAdminRemove = async (req, res, next) => {
  try {
    const token = req.query.boo;
    const user = await User.findByToken(token);
    req.isAdmin = user.isAdmin;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdminUpdate = async (req, res, next) => {
    try {
      const token = req.body.params.boo;
      const user = await User.findByToken(token);
      req.isAdmin = user.isAdmin;
      req.body = req.body.params.data
      next();
    } catch (error) {
      next(error);
    }
  };

// POST /api//admin/posters/
router.post("/", isAdminUpdate, async (req, res, next) => {
  try {
    if (req.isAdmin) {
      const poster = await Poster.create(req.body);
      res.send(poster);
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/admin/posters/:id
router.delete("/:id", isAdminRemove, async (req, res, next) => {
  try {
    if (req.isAdmin) {
      const poster = await Poster.findByPk(req.params.id);
      poster.destroy();
      res.json(poster);
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    next(error);
  }
});

//PUT /api/admin/posters/:id
router.put("/:id", isAdminUpdate, async (req, res, next) => {
  try {
    if (req.isAdmin) {
      const poster = await Poster.findByPk(req.params.id);
      res.send(await poster.update(req.body));
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    next(error);
  }
});
