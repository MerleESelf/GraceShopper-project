const router = require('express').Router();
const { models: { CartDetail }} = require('../db')
module.exports = router

//    /api/cart/:posterId/:orderId

router.delete('/:posterId/:orderId', async (req, res, next) => {
	try {
		const productOrder = await CartDetail.destroy({
			where: {
				posterId: req.params.posterId,
				orderId: req.params.orderId,
			},
		});

		res.json(productOrder);
	} catch (err) {
		next(err);
	}
});

