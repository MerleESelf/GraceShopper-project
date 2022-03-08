'use strict';

const {
	db,
	models: { User, Poster, Order, CartDetail },
} = require('../server/db');
const names = require('./dummyData');
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const splitNames = names.split(',');
const len = splitNames.length;


async function seed() {
	await db.sync({ force: true }); // clears db and matches models to tables
	console.log('db synced!');

	const users = await Promise.all(
		new Array(4).fill(1).map((a, i) =>
			User.create({
				username: `${splitNames[i]}`,
				password: '123',
				orderId: i + 1,
			})
		)
	);
	users.push(
		await User.create({ username: 'cody', password: '123', isAdmin: true })
	);

	const posters = await Promise.all(
		new Array(len).fill(1).map((a, i) =>
			Poster.create({
				name: `${splitNames[i]}`,
				creator: `creator ${splitNames[i]}`,
				description: "It's a cat, it's a sun, what more would you want",
				price: i * 5,
				imageUrl: `https://loremflickr.com/320/${240 + i}`,
			})
		)
	);

	// Creating Order

	const orders = await Promise.all(
		new Array(4).fill(1).map((a, i) =>
			Order.create({
				isComplete: false,
				userId: i + 1,
			})
		)
	);

	const cartDetail1 = await Promise.all(
		new Array(10).fill(1).map((a, i) =>
			CartDetail.create({
				quantity: 100,
				orderId: 1,
				posterId: i + 1,
			}),
		),
	);

	const cartDetail2 = await Promise.all(
		new Array(10).fill(1).map((a, i) =>
			CartDetail.create({
				quantity: 100,
				orderId: 2,
				posterId: i + 20,
			}),
		),
	);

	const cartDetail3 = await Promise.all(
		new Array(10).fill(1).map((a, i) =>
			CartDetail.create({
				quantity: 100,
				orderId: 3,
				posterId: i + 40,
			}),
		),
	);

	const cartDetail4 = await Promise.all(
		new Array(10).fill(1).map((a, i) =>
			CartDetail.create({
				quantity: 100,
				orderId: 4,
				posterId: i + 60,
			}),
		),
	);
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
		cartDetail1: {
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
