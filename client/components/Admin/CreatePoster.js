import React from "react";
import { connect } from "react-redux";
import { createPosterThunk } from "../../store/posters";

export class CreatePoster extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      creator: "",
      price: "",
      imageUrl: "",
      quantity: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.token;
    this.props.createPoster(token, this.state);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const poster = this.state;
    return (
      <div>
        {this.state.error ? (
          <div className="errorMessage">{this.state.error}</div>
        ) : (
          ""
        )}
        <form className="edit">
          <label htmlFor="name">Poster Name:</label>
          <input name="name" value={poster.name} onChange={this.handleChange} />
          <label htmlFor="creator">Created By: </label>
          <input
            name="creator"
            value={poster.creator}
            onChange={this.handleChange}
          />
          <label htmlFor="imageUrl">Poster ImageUrl:</label>
          <input
            name="imageUrl"
            value={poster.imageUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price: </label>
          <input
            name="price"
            value={poster.price}
            onChange={this.handleChange}
          />
          <label htmlFor="quantity">Poster In Storage:</label>
          <input
            name="quantity"
            value={poster.quantity}
            onChange={this.handleChange}
          />
        </form>
        <button id="saveChanges" type="submit" onSubmit={this.handleSubmit}>
            Save Changes
          </button>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    state: reduxState.allPosters,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    createPoster: (token, poster) =>
      dispatch(createPosterThunk(token, poster, history)),
  };
};

export default connect(mapState, mapDispatch)(CreatePoster);
