import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllPosters from "./components/AllPosters";
import AdminPosters from "./components/Admin/AdminPosters";
import SinglePoster from "./components/SinglePoster";
import OrderConfirmation from "./components/OrderConfirmation";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import AdminHome from "./components/Admin/Home";
import { me } from "./store";
import ThankyouPage from "./components/ThankyouPage";
import CartItem from "./components/cart";
import CreatePoster from "./components/Admin/CreatePoster";
import Users from "./components/Admin/Users";
import EditPosters from "./components/Admin/EditPosters";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    if (isAdmin) {
      return (
        <Switch>
          <Route path="/admin/home" component={AdminHome} />
          <Route exact path="/admin/posters" component={AdminPosters} />
          <Route path="/admin/posters/edit" component={EditPosters} />
          <Route path="/admin/create" component={CreatePoster} />
          <Route path="/admin/users" component={Users} />
          <Redirect to="/admin/home" />
        </Switch>
      );
    } else if (isLoggedIn) {
      return (
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/posters" component={AllPosters} />
          <Route exact path="/posters/:id" component={SinglePoster} />

          <Route exact path="/cart" component={CartItem} />
          <Route path="/checkedOut" component={ThankyouPage} />
          <Route path="/orderconfirmation" component={OrderConfirmation} />
          <Redirect to="/home" />

        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      );
    }
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
