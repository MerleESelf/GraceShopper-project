import React from "react";
import { connect } from "react-redux";
import { getAllPosters } from "../store/posters";
import { Link } from "react-router-dom";


class PosterCard extends React.Component { 
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this)
    }
    
    //handleClick(){}

    render() {
      const Poster = this.props.poster;
  
      return (
        <div>
          <div>
            <img className="posterImage" src={poster.imageUrl} alt="image" />
          </div>
          <div className="posterInfo">
            {/* link to single poster */}
            {/* <Link to={`/posters/${poster.id}`}>
              <p>Name: </p>
            </Link> */}
            <p>{poster.name}</p>
            <p>{poster.creator}</p>
            <p>{poster.price}</p>
          </div>
          <form className="addToCart" onSubmit={(ev) => ev.preventDefault()}>
            <div>
              <button type="button" onClick={this.handleClick}>
                Add to Cart
              </button>
            </div>
          </form>
        </div>
      );
    }
  }


export class AllPosters extends React.Component {
  componentDidMount() {
    this.props.loadPosters();
  }

  render() {
    return this.props.state === undefined || this.props.state.length === 0 ? (
      "NO POSTERS"
    ) : (
      <div>
        <div>
          <h2>THE POSTER SHOP</h2>
          <h3>Fill your walls with some of most vibrant best-selling art</h3>
        </div>
        <div>
            <h4>SHOP POSTER DEALS</h4>
          {this.props.state.map((poster) => {
            return <PosterCard key={poster.id} poster={poster} />;
          })}
        </div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    state: reduxState.allPosters,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadRobots: () => dispatch(getAllPosters()),
  };
};

export default connect(mapState, mapDispatch)(AllPosters);