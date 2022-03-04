const router = require('express').Router()
const { models: { Poster,User,Order,CartDetail }} = require('../db')
module.exports = router


// EDIT /api/cart/:cartId/:orderId
router.put('/orderId/posterId', async (req, res, next) => {
	try {
        const posterToEdit = await CartDetail.findByPk(req.params.cartId, {include: Order });
        res.send( await posterToEdit.update(req.body));
	} catch (error) {
		next(error )
	}
})