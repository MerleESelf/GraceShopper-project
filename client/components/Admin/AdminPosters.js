import React from "react";
import { connect } from "react-redux";
import { getAllPosters, removePosterThunk } from "/Users/carolwu/Documents/Grace Hopper/2.0 Senior Phase/GraceShopper-project/client/store/posters.js"
import { Link } from "react-router-dom";
import { isAdmin } from "../../store";


class PosterCard extends React.Component { 
  constructor(){
    super();
    this.handleRemove = this.handleRemove.bind(this)
  }

    handleRemove(event){
      event.preventDefault();
      const token = window.localStorage.token
      this.props.removePoster(this.props.poster.id, token)
      console.log("handleRemove")
    }

    render() {
      const poster = this.props.poster;
      console.log("this.props in single", this.props)
  
      return (
        <div className='poster'>
          <div>
          <Link to={`/posters/${poster.id}`}>
            <img className="posterImage" src={poster.imageUrl} alt="image" />
          </Link> 
          </div>
          <div className="posterInfo">
            <p>{poster.name}</p>
            <p>{poster.creator}</p>
            <p>${poster.price}</p>
          </div>
          <form className="remove" >
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
    console.log("this.props", this.props)
    return this.props.state === undefined || this.props.state.length === 0 ? (
      "NO POSTERS"
    ) : (
      <div>
          {this.props.state.map((poster) => {
            return <PosterCard key={poster.id} poster={poster} removePoster={this.props.removePoster}/>;
          })}
      </div>
    );
  }
}

const mapState = (reduxState) => {
  console.log("reduxState", reduxState)
  return {
    state: reduxState.allPosters,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadPosters: () => dispatch(getAllPosters()),
    removePoster: (id, token) => dispatch(removePosterThunk(id, token))
  };
};

export default connect(mapState, mapDispatch)(AdminPosters);