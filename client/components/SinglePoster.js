import React from 'react';
import { connect } from 'react-redux';
import { fetchSinglePoster } from '../store/singlePoster';

class SinglePoster extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchSinglePoster(this.props.match.params.id);
	}

	render() {
		const { poster } = this.props;
		return (
			<div>
				<div id='wrap'>
					<div id='product_layout_3'>
						<div className='product_image'>
							<div className='main_image'>
								<img src={poster.imageUrl} />
							</div>
						</div>
						<div className='product_desc'>
							<h1>{poster.name}</h1>
							<span className='price'>$70</span>
							<span className='sale_price'>{poster.price}</span>
							<span className='stars'>
								<i className='fa fa-star'></i>
								<i className='fa fa-star'></i>
								<i className='fa fa-star'></i>
								<i className='fa fa-star'></i>
								<i className='fa fa-star-half'></i>
							</span>
							<div className='product_options'>
								<div className='select'>
									<select id='size'>
										<option value='1'>54" x 36"</option>
										<option value='2'>36" x 24"</option>
										<option value='3'>24" x 16"</option>
										<option value='4'>18" x 12"</option>
									</select>
								</div>
							</div>
							<div className='buying'>
								<div className='quantity'>
									<label htmlFor='quantity'>QTY:</label>
									<input type='text' />
								</div>
								<div className='cart'>
									<a href='#' className='add'>
										Add to Cart <i className='fa fa-shopping-cart fa-lg'></i>
									</a>
								</div>
							</div>
							<div className='other_options'>
								<span className='SKU'>SKU:12345</span>
								<span className='QTY'>QTY:35</span>
							</div>
							<div className='description'>{poster.description}</div>
							<div className='social'>
								<span className='share'>Share This:</span>
								<span className='buttons'>
									<img src='https://i.imgur.com/M8D8rr8.jpg' />
								</span>
							</div>
						</div>
						<div className='tabular'>
							<ul className='tabs group'>
								<li>
									<a href='#/one'>More Info</a>
								</li>
								<li>
									<a href='#/two'>Reviews</a>
								</li>
								<li>
									<a className='active' href='#/three'>
										Details
									</a>
								</li>
							</ul>
							<div id='content'>
								<aside id='one'>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation
										ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
										occaecat cupidatat non proident, sunt in culpa qui officia
										deserunt mollit anim id est laborum.
									</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation
										ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
										occaecat cupidatat non proident, sunt in culpa qui officia
										deserunt mollit anim id est laborum.
									</p>
								</aside>
								<aside id='two'>
									<span className='author'>Marty Mcfly</span>
									<span className='stars'>
										<i className='fa fa-star'></i>
										<i className='fa fa-star'></i>
										<i className='fa fa-star'></i>
										<i className='fa fa-star'></i>
										<i className='fa fa-star-half'></i>
									</span>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation
										ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
										occaecat cupidatat non proident, sunt in culpa qui officia
										deserunt mollit anim id est laborum.
									</p>

									<span className='full_review'>
										<a href='#'>Read The Full Review</a>
									</span>
									<span className='write_review'>
										<a href='#'>Write Your Own Review</a>
									</span>
								</aside>
								<aside id='three'>
									<div className='images'>
										<img src={poster.imageUrl} />
										<img src={poster.imageUrl} />
										<img src={poster.imageUrl} />
									</div>
									
								</aside>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	poster: state.singlePoster,
});

const mapDispatchToProps = (dispatch) => ({
	fetchSinglePoster: (id) => dispatch(fetchSinglePoster(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoster);
