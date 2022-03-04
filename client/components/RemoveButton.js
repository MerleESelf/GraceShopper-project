import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removePosterFromCart } from '../store/cart';

class RemoveButton extends Component {
	constructor() {
		super();
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		
		this.props.removeAPoster(this.props.posterId);
	}

	render() {
		return <button onClick={() => this.handleDelete()}>Remove</button>;
	}
}
const mapState = (state) => {
	return {
		allPosters: state.allPosters,
	};
};

const mapDispatchToProps = (dispatch) => ({
	removePosterFromCart: (posterId) => dispatch(removePosterFromCart(posterId)),
});

export default connect(mapState, mapDispatchToProps)(RemoveButton);
