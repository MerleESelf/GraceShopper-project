const router = require('express').Router();
const {
	models: { CartDetail, Order, Poster },
} = require('../db');
module.exports = router;

//    /api/cart/:posterId/:orderId

router.delete('/', async (req, res, next) => {
	console.log('req', req.body.id);
	console.log('res', res.body.id);
	try {
		await Poster.destroy({
			where: {
				id: res.body.id,
			},
		});
		res.end();
	} catch (error) {
		next(error);
	}
});
