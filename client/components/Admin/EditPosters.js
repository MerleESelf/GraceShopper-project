import React from "react";
import { connect } from "react-redux";
import {
  getAllPosters,
  removePosterThunk,
  adminUpdateSinglePoster,
} from "../../store/posters";

class PosterCard extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      creator: "",
      price: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.poster.name || "",
      creator: this.props.poster.creator || "",
      imageUrl: this.props.poster.imageUrl || "",
      price: this.props.poster.price || "",
    });
  }

  componentDidUpdate(prePro) {
    if (prePro.poster.id !== this.props.poster.id) {
      this.setState({
        name: this.props.poster.name || "",
        creator: this.props.poster.creator || "",
        price: this.props.poster.price || "",
        imageUrl: this.props.poster.imageUrl || "",
      });
    }
  }

  handleRemove(event) {
    event.preventDefault();
    const token = window.localStorage.token;
    this.props.removePoster(this.props.poster.id, token);
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.token;
    this.props.adminUpdateSinglePoster(
      this.props.poster.id,
      { ...this.props.poster, ...this.state },
      token
    );
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const poster = this.state;
    return (
      <div className="poster">
        <div>
          <img className="posterImage" src={poster.imageUrl} alt="image" />
        </div>
        <form className="edit" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Poster Name:</label>
          <input name="name" value={poster.name} onChange={this.handleChange} />
          <label htmlFor="creator">Created By: </label>
          <input
            name="creator"
            value={poster.creator}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price: </label>
          <input
            name="price"
            value={poster.price}
            onChange={this.handleChange}
          />
          <button id="saveChanges" type="submit">
            {" "}
            Save Changes{" "}
          </button>
        </form>
        <form className="remove">
          <div>
            <button type="button" onClick={this.handleRemove}>
              Remove Poster
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export class AdminPosters extends React.Component {
  componentDidMount() {
    this.props.loadPosters();
  }

  render() {
    return this.props.state === undefined || this.props.state.length === 0 ? (
      "NO POSTERS"
    ) : (
      <div>
        {this.props.state.map((poster) => {
          return (
            <PosterCard
              key={poster.id}
              poster={poster}
              removePoster={this.props.removePoster}
              adminUpdateSinglePoster={this.props.adminUpdateSinglePoster}
            />
          );
        })}
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    state: reduxState.allPosters,
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    loadPosters: () => dispatch(getAllPosters()),
    removePoster: (id, token) => dispatch(removePosterThunk(id, token)),
    adminUpdateSinglePoster: (id, poster, token) =>
      dispatch(adminUpdateSinglePoster(id, poster, token, history)),
  };
};

export default connect(mapState, mapDispatch)(AdminPosters);
