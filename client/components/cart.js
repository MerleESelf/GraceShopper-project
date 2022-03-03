import React from 'react';
import { connect } from 'react-redux';
import { removeItemThunk, updatedStatusThunk } from '../store/cart';
import { Link } from "react-router-dom";

const poster1 = {
	name: 'cat',
	creator: 'Jo',
	price: 20,
	size: '18" x 12"',
	quantity: 100,
	description: "It's a cat, it's a moon, what more would you want",
	imageUrl: 'https://loremflickr.com/320/240',
};

class CartItem extends React.Component {
	constructor() {
		super();
		this.state = {};

		this.removeFromCart = this.removeFromCart.bind(this);
	}
	removeFromCart(product) {
		this.props.removeItem(product);
	}

	handleSubmit(event){
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

					<div className='product'>
						<div className='product-image'>
							<img src='https://loremflickr.com/320/240' />
						</div>
						<div className='product-details'>
							<div className='product-title'>groomingbymoonlight</div>
							<p className='product-description'>{poster1.description}</p>
						</div>
						<div className='product-price'>{poster1.price}</div>
						<div className='product-quantity'>
							<input type='number' value='2' min='1'></input>
						</div>
						<div className='product-removal'>
							<button
								className='remove-product'
								onClick={this.props.removeItem}
							>
								Remove
							</button>
						</div>
						<div className='product-line-price'>25.98</div>
					</div>

					<div className='product'>
						<div className='product-image'>
							<img src='https://loremflickr.com/320/240' />
						</div>
						<div className='product-details'>
							<div className='product-title'>groomingbymoonlight</div>
							<p className='product-description'>{poster1.description}</p>
						</div>
						<div className='product-price'>{poster1.price}</div>
						<div className='product-quantity'>
							<input type='number' value='2' min='1'></input>
						</div>
						<div className='product-removal'>
							<button
								className='remove-product'
								onClick={this.props.removeItem}
							>
								Remove
							</button>
						</div>
						<div className='product-line-price'>25.98</div>
					</div>

					{/* <div className='totals'>
						<div className='totals-item'>
							<label>Subtotal</label>
							<div className='totals-value' id='cart-subtotal'>
								71.97
							</div>
						</div>
						<div className='totals-item'>
							<label>Tax (5%)</label>
							<div className='totals-value' id='cart-tax'>
								3.60
							</div>
						</div>
						<div className='totals-item'>
							<label>Shipping</label>
							<div className='totals-value' id='cart-shipping'>
								15.00
							</div>
						</div>
						<div className='totals-item totals-item-total'>
							<label>Grand Total</label>
							<div className='totals-value' id='cart-total'>
								90.57
							</div>
						</div>
					</div>

					<button className='checkout'>Checkout</button> */}
				</div>
				<div>{}
					<form>
						<Link to="/login"><button>Sign in and Check Out</button></Link>
					</form>
					<form>
						<button value="submit" onSubmit={this.handleSubmit}>Check Out as Guest</button>
					</form>
				</div>
			</div>
		);
	}
}

// const mapStateToProps = (state) => ({
// 	poster: state.singlePoster,
// });

const mapDispatchToProps = (dispatch) => ({
	removeItem: (item) => dispatch(removeItemThunk(item)),
	updateCompleteStatus: () => dispatch(updatedStatusThunk())
});

export default connect(null, mapDispatchToProps)(CartItem);
