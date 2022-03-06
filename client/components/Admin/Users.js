import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../store/users";

class UserCard extends React.Component {
  render() {
    const user = this.props.user;

    return (
      <div className="user">
        <div className="userInfo">
          <p>User Id: {user.id}</p>
          <p>User Name: {user.username}</p>
        </div>
      </div>
    );
  }
}

export class Users extends React.Component {
  componentDidMount() {
    const token = window.localStorage.token;
    this.props.loadUsers(token);
  }

  render() {
    return this.props.state === undefined ||
      this.props.state.length === 0 ||
      !Array.isArray(this.props.state) ? (
      "NO POSTERS"
    ) : (
      <div>
        {this.props.state.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    );
  }
}

const mapState = (reduxState) => {
	return {
		state: reduxState.users,
	};
};

const mapDispatch = (dispatch) => {
  return {
    loadUsers: (token) => dispatch(fetchUsers(token)),
  };
};

export default connect(mapState, mapDispatch)(Users);
