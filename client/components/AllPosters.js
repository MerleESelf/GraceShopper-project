import React from "react";
import { connect } from "react-redux";
import { getAllPosters } from "../store/posters";
import { Link } from "react-router-dom";


class PosterCard extends React.Component { 

    render() {
      const poster = this.props.poster;
  
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
          <form className="addToCart" onSubmit={(ev) => ev.preventDefault()}>
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


      <div id="allPosters" className="posters-container">


          {this.props.state.map((poster) => {
            return <PosterCard key={poster.id} poster={poster} />;
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

const mapDispatch = (dispatch) => {
  return {
    loadPosters: () => dispatch(getAllPosters()),
  };
};

export default connect(mapState, mapDispatch)(AllPosters);