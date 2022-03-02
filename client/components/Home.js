import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <>
      <div>
        <h3>Welcome, {username}</h3>
      </div>
      <div>
        <h2>THE POSTER SHOP</h2>
        <h3>Fill your walls with some of most vibrant best-selling art</h3>
      </div>
      <div>
        <h4>
          <Link to="/posters">SHOP POSTER DEALS</Link>
        </h4>
      </div>
    </>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
