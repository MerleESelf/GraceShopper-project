import React from 'react';
import { connect } from 'react-redux';
import { removedPoster } from '../store/cart';
import RemoveButton from './RemoveButton';

const poster1 = {
	id: 1,
	name: 'groomingbymoonlight',
	creator: 'carol merle',
	price: 20,
	size: '18" x 12"',
	quantity: 100,
	description: "It's a cat, it's a moon, what more would you want",
	imageUrl: 'https://loremflickr.com/320/240',
};

class Cart extends React.Component {
	constructor() {
		super();

		this.removeFromCart = this.removeFromCart.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(posterId) {
		this.props.removeAPoster(posterId);
	}
	removeFromCart(product) {
		this.props.removeItem(product);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.updateCompleteStatus();
	}
	render() {
		return (
			<div>
				<h1>Shopping Cart</h1>

				<div className='shopping-cart'>
					<div className='column-labels'>
						<label className='product-details'>{poster1.name}</label>
						<label className='product-price'>{poster1.price}</label>
						<label className='product-quantity'>{poster1.quantity}</label>
						<label className='product-removal'>Remove</label>
						<label className='product-line-price'>Total</label>
					</div>
					{this.props.postersInCart.map((poster) => {
						return (
							<div className='product' key={poster.id}>
								<div className='product-image'>
									<img src='https://loremflickr.com/320/240' />
								</div>
								<div className='product-details'>
									<div className='product-title'>{poster.name}</div>
									<p className='product-description'>{poster.description}</p>
								</div>
								<div className='product-price'>{poster.price}</div>
								<div className='product-removal'>
									<button className='delete-btn' onClick={() => this.handleDelete(poster.id)}>
										Remove
									</button>
									;
								</div>
								<div className='product-line-price'>25.98</div>
							</div>
						);
					})}
				</div>
				<form>
					<button value='submit' onSubmit={this.handleSubmit}>
						Check Out
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	postersInCart: state.cart.cart.posters,
});

const mapDispatchToProps = (dispatch) => ({
	removeAPoster: (posterId) => dispatch(removedPoster(posterId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
