import React from "react";
import { connect } from "react-redux";
import {
  getAllPosters,
  removePosterThunk,
  adminUpdateSinglePoster
} from "/Users/carolwu/Documents/Grace Hopper/2.0 Senior Phase/GraceShopper-project/client/store/posters.js";
import { Link } from "react-router-dom";
// import { isAdmin } from "../../store";

class PosterCard extends React.Component {
  constructor(props) {
    super(props);
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
    console.log("handleRemove");
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateSinglePoster({ ...this.state });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const poster = this.state;
    // console.log("this.props in single", this.props);

    return (
      <div className="poster">
        <div>
          <Link to={`/posters/${poster.id}`}>
            <img className="posterImage" src={poster.imageUrl} alt="image" />
          </Link>
        </div>
        <form className="edit" onSubmit={this.handleSubmit}>
          <label htmlFor="imageUrl">Poster ImageUrl:</label>
          <input name="imageUrl" value={poster.imageUrl} onChange={this.handleChange}/>
          <label htmlFor="name">Poster Name:</label>
          <input name="name" value={poster.name} onChange={this.handleChange} />
          <label htmlFor="creator">Created By: </label>
          <input name="creator" value={poster.creator} onChange={this.handleChange} />
          <label htmlFor="price">Price: </label>
          <input name="price" value={poster.price} onChange={this.handleChange} />
          <button id="saveChanges" type="submit"> Save Changes </button>
        </form>
        <form className="remove">
          <div>
            <button type="button" onClick={this.handleRemove}>
              Remove
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
    console.log("this.props", this.props);
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
              updateSinglePoster = {this.props.updateSinglePoster}
            />
          );
        })}
      </div>
    );
  }
}

const mapState = (reduxState) => {
  console.log("reduxState", reduxState);
  return {
    state: reduxState.allPosters,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadPosters: () => dispatch(getAllPosters()),
    removePoster: (id, token) => dispatch(removePosterThunk(id, token)),
    adminUpdateSinglePoster: (id) => dispatch(adminUpdateSinglePoster(id))
  };
};

export default connect(mapState, mapDispatch)(AdminPosters);
