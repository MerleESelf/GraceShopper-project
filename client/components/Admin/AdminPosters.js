import React from "react";
import AllPosters from "../AllPosters";
import { Link } from "react-router-dom";

export default class AdminPosters extends React.Component {
  render() {
    return (
      <div>
        <AllPosters />
        <Link to="/admin/posters/edit"><button>Edit</button></Link>
      </div>
    )
  }
}