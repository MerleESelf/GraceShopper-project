import React from 'react';
import { connect } from 'react-redux';
import { removedPoster } from '../store/cart';
import RemoveButton from './RemoveButton';
import {
	checkOutThunk,
	fetchCompleteOrder,
	fetchOpenOrder,
} from '../store/order';

class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			subtotal: 0,
		};
		this.removeFromCart = this.removeFromCart.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		const userId = this.props.match.path.split('/')[2];
		console.log('this.props.match.path', userId);
		this.props.loadOpenOrder(userId);
	}

	handleDelete(posterId) {
		this.props.removeAPoster(posterId);
	}
	removeFromCart(product) {
		this.props.removeItem(product);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log('handle submit')
		const userId = this.props.match.path.split('/')[2];
		const orderId = this.props.order.openOrder.id
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
										<img src={orderDetail.posters[0].imageUrl} />
									</div>
									<div>Poster Name: {orderDetail.posters[0].name} </div>
									<div>Poster Size: {orderDetail.posters[0].size} </div>
									<div>Poster Creator: {orderDetail.posters[0].creator} </div>
									<div>
										Poster Description: {orderDetail.posters[0].description}
									</div>
									<div>Poster Price: ${orderDetail.posters[0].price} </div>

									<div>
										<button>Remove</button>
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
											<td>{orderDetail.posters[0].name} </td>
											<td>${orderDetail.posters[0].price}.00</td>
											<td>{orderDetail.posters.length}</td>
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
	postersInCart: state.cart.cart.posters,
	order: state.order,
});

const mapDispatchToProps = (dispatch, {history}) => ({
	loadOpenOrder: (userId) => dispatch(fetchOpenOrder(userId)),
	removeAPoster: (posterId) => dispatch(removedPoster(posterId)),
	checkOut: (userId, orderId) => dispatch(checkOutThunk(userId, orderId, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
