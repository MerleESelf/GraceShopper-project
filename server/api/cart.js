router.put("/", async (req, res, next) => {
  try {
    const poster = await CartDetail.findByPk(req.params.id);
    poster.quantity--;
    await poster.save();
    res.send(poster);
  } catch (error) {
    next(error);
  }
});
