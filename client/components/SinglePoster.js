import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePoster } from '../store/singlePoster';
import {updateCartAdd} from '../store/order'

class SinglePoster extends Component {
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
	}

	componentDidMount() {
		this.props.fetchSinglePoster(this.props.match.params.id);
		
	}
	update() {
		const userId = this.props.isLoggedIn
		const posterId = this.props.poster.id
		this.props.updateCartAdd(userId,posterId )
		// if (!orderId){
		// 	//need to 
		// 	//need to create new order in DB and associate it to the user
		// }
		// else{
		// 	editOrderThunk(order.id, userId)
		// }//look for cart detail where posterid = posterid
		//if none then create
		//if yes then quantity ++}
		//post request to cart details and it is going to take the orderId that we got back from fetch Open Order and the poster Id from the state of single poster and that itself is going to be its own lil thunk that then goes heyhey and sends theat offto a post route on the backend
		
		// if (!localStorage.getItem('cart')) {
		// 	localStorage.setItem(
		// 		'cart',
		// 		JSON.stringify([
		// 			{
		// 				posterId: this.props.match.params.id,
		// 				itemQuantity: 1,
		// 			},
		// 		])
		// 	);
		// } else {
		// 	var existing = JSON.parse(localStorage.getItem('cart'));
		// 	var [updateQuant] = existing.filter(
		// 		(e) => e.posterId === this.props.match.params.id
		// 	);
		// 	//need to check if the posterId already exists, if it does just update quantit
		// 	if (updateQuant) {
		// 		updateQuant.itemQuantity++;
		// 		localStorage.setItem('cart', JSON.stringify(existing));
		// 	} else {
		// 		existing.push({
		// 			posterId: this.props.match.params.id,
		// 			itemQuantity: 1,
		// 		});
		// 		localStorage.setItem('cart', JSON.stringify(existing));
		// 	}
		// }
	}

	render() {
		const { poster } = this.props;
		return (
			<div className='poster'>
				<div >
					<img src={poster.imageUrl} />
				</div>

				<div className='product_desc'>
					<h1>{poster.name}</h1>
					<span className='sale_price'>
						PRICE (cmon you know it's totally worth it for this SWEET poster of
						a cat in a hat): {poster.price}
					</span>
					{/* THE CODE BELOW DOES NOT DO ANYTHING - can someone explain why we have it? */}
					{/* <div className='product_options'>
						<div className='select'>
							<select id='size'>
								<option value='1'>54" x 36"</option>
								<option value='2'>36" x 24"</option>
								<option value='3'>24" x 16"</option>
								<option value='4'>18" x 12"</option>
							</select>
						</div>
					</div> */}
					<div className='other_options'>
						<span className='QTY'>NUMBER IN STOCK: {poster.quantity}</span>
						<p>note: the way our company calculates stock is based on the number of items actually PURCHASED and does not account for posters that are in active carts.</p>
					</div>
					<div className='cart'>
						<a href='#' className='add'>
							{/*  */}
							<input type='button' value='ADD TO CART' onClick={this.update} />
							{/*  */}
						</a>
					</div>
				</div>
				<div className='description'>{poster.description}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	poster: state.singlePoster,
	isLoggedIn: state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
	fetchSinglePoster: (id) => dispatch(fetchSinglePoster(id)),
	updateCartAdd: (userId, posterId) => dispatch(updateCartAdd(userId, posterId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoster);

