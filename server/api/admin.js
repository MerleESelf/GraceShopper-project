// this should be merged with the allPosters API because they share the same /api/posters

const router = require("express").Router();
module.exports = router;
const {
  models: { Poster, User },
} = require("../db");
module.exports = router;

// async function isAdmin(token){
//   const user = await User.findByToken(token);
//   return user.isAdmin;
// }

const isAdmin = async (req, res, next) => {
  try {
    console.log('in isAdmin API, req.query', req.query.boo)
    const token = req.query.boo
    const user = await User.findByToken(token);
    req.isAdmin = user.isAdmin;
    next();
  } catch(error) {
    next(error);
  }
};

//check if it's admin 
// route for all posters
router.get("/", async (req, res, next) => {
  try {
    const allPosters = await Poster.findAll();
    res.send(allPosters);
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     const poster = await Poster.findByPk(req.params.id);
//     if (!poster) {
//       let err = new Error("No cats or hats or posters here!");
//       err.status = 404;
//       next(err);
//     } else {
//       res.send(poster);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// POST /api//admin/posters/
router.post("/", isAdmin, async (req, res, next) => {
  try {
    if(req.isAdmin){
      const poster = await Poster.create(req.body);
      res.send(poster);
    } else {
      throw new Error('Unauthorized')
    }
  } catch (error) {
    next(error);
  }
});

//DELETE /api/admin/posters/:id
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    console.log("-----API _______req.body", req.isAdmin) 
    console.log("-----API _______req.params", req.params)  
    if(req.isAdmin){
      const poster = await Poster.findByPk(req.params.id);
      poster.destroy()
      res.send(poster);
    } else {
      throw new Error('Unauthorized')
    }
  } catch (error) {
    next(error);
  }
});

//PUT /api/admin/posters/:id
router.put("/:id", async (req, res, next) => {
  try {
    const poster = await Poster.findByPk(req.params.id);
    
    await poster.save();
    res.send(poster);
  } catch (error) {
    next(error);
  }
});
