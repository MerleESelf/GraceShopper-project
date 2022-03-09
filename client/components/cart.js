import React from 'react';
import { connect } from 'react-redux';
import {
	checkOutThunk,
	fetchCompleteOrder,
	fetchOpenOrder,
	removedPosterThunk,
} from '../store/order';

class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			subtotal: 0,
		};
		this.removeFromCart = this.removeFromCart.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const userId = this.props.match.path.split('/')[2];
		console.log('this.props.match.path', userId);
		this.props.loadOpenOrder(userId);
	}

	removeFromCart(userId, orderId, posterId) {
		this.props.removedPosterThunk(userId, orderId, posterId);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log('handle submit');
		const userId = this.props.match.path.split('/')[2];
		const orderId = this.props.order.openOrder.id;
		this.props.checkOut(userId, orderId);
	}

	render() {
		console.log('this.props', this.props);
		console.log('this.props.order', this.props.order);

		return (
			<div>
				<h1>Shopping Cart</h1>

				<div className='shopping-cart'>
					{this.props.order?.cartPosters &&
						this.props.order.cartPosters.map((orderDetail) => {
							return (
								<div key={orderDetail.id}>
									<div>
										<img src={orderDetail.poster.imageUrl} />
									</div>
									<div>Poster Name: {orderDetail.poster.name} </div>
									<div>Poster Size: {orderDetail.poster.size} </div>
									<div>Poster Creator: {orderDetail.poster.creator} </div>
									<div>
										Poster Description: {orderDetail.poster.description}
									</div>
									<div>Poster Price: ${orderDetail.poster.price} </div>

									<div>
										<button
											onClick={() =>
												this.removeFromCart(
													this.props.order.openOrder.userId,
													orderDetail.orderId,
													orderDetail.poster.id
												)
											}
										>
											Remove
										</button>
									</div>
									<br />
								</div>
							);
						})}
				</div>
				<div>
					<h3>Order Summary</h3>
					<table class='fixed_headers'>
						<thead>
							<tr>
								<th>Item</th>
								<th>Price</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							{this.props.order?.cartPosters &&
								this.props.order.cartPosters.map((orderDetail) => {
									return (
										<tr key={orderDetail.id}>
											<td>{orderDetail.poster.name} </td>
											<td>${orderDetail.poster.price}.00</td>
											<td>{orderDetail.poster.length}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
					<div>
						Subtotal:
						{this.state.subtotal}
					</div>
					<form>
						<button value='submit' onClick={this.handleSubmit}>
							Check Out
						</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	order: state.order,
});

const mapDispatchToProps = (dispatch, { history }) => ({
	loadOpenOrder: (userId) => dispatch(fetchOpenOrder(userId)),

	removedPosterThunk: (userId, orderId, posterId) =>
		dispatch(removedPosterThunk(userId, orderId, posterId)),
	checkOut: (userId, orderId) =>
		dispatch(checkOutThunk(userId, orderId, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
