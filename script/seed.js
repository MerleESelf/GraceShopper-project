'use strict';

const {
	db,
	models: { User, Poster, Order, CartDetail },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log('db synced!');

	// Creating Users
	const users = await Promise.all([
		User.create({ username: 'cody', password: '123', isAdmin: true}),
		User.create({ username: 'murphy', password: '123'}),
		User.create({ username: 'amber', password: '123'}),
	]);
	
	//Creating Posters
	const groomingbymoonlight = Poster.create({
		name: 'groomingbymoonlight',
		creator: 'carol merle',
		description: "It's a cat, it's a moon, what more would you want",
		price: 20,
	})

	const posters = await Promise.all([
		groomingbymoonlight,
		Poster.create({
			name: 'groomingbysunlight',
			creator: 'amber L',
			description: "It's a cat, it's a sun, what more would you want",
			price: 40,
		}),
		Poster.create({
			name: 'sunlight',
			creator: 'amber',
			description: "It's a cat, it's a sun, what more would you want",
			price: 40,
		}),
	]);

	// Creating Order
	const orders = await Promise.all([
		Order.create({ isComplete: true, userId: 1, moneyTotal: 20 }),
		Order.create({ isComplete: false, userId: 1, moneyTotal: 20 }),
		Order.create({ isComplete: false, userId: 3, moneyTotal: 20 }),
	]);

	// Creating CartDetail
	const cartA = CartDetail.create({
		price: 100,
		quantity: 10,
		orderId: 2,
		posterId: 1,
	})
	const cartB = CartDetail.create({
		price: 110,
		quantity: 20,
		orderId: 2,
		posterId: 2,
	})
	const cartDetail = await Promise.all([
		cartA,
		cartB,
		CartDetail.create({
			price: 120,
			quantity: 30,
			orderId: 3,
			posterId: 3,
		}),
	]);

	// Creating Associations

	console.log(`seeded ${users.length} users`);
	console.log(`seeded successfully`);
	return {
		users: {
			cody: users[0],
			murphy: users[1],
		},
		posters: {
			groomingbymoonlight: posters[0],
		},
		orders: {
			200: orders[0],
		},
		cartDetail: {
			3: cartDetail[0],
		},
		// cartDetailPosters
	};
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...');
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log('closing db connection');
		await db.close();
		console.log('db connection closed');
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
