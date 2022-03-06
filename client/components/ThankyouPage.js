import React from "react";
import { connect } from "react-redux";
//import { getOrder } from "";
import { Link } from "react-router-dom";

class ThankyouPage extends React.Component {
  constructor(){
      super()
  }

//   componentDidMount() {
//     this.props.loadOrder();
//   }

  render() {
    const username = this.props.state.username
      // const order = this.props.state.order
      // const isLoggedIn = this.props.state.isLoggedIn
    // return this.props.state === undefined || this.props.state.length === 0 ? (
    //   "NO ORDERS"
    // ) : (
      return(
      <div id="thank">
          <h1>Thank You</h1>
          <div>
            <h3>
              A confirmation has been sent to your email!
              {/* or click <Link to="/orderconfirmation">here</Link> to view the order. */}
            </h3>
              <div>
                  {username ? 
                    ('')
                    :(
                        <h2>
                            Since you are here, join our list for discounts!
                            <form>
                                <Link to="/signup"><button value="submit">Yes! Sign Me Up</button></Link>
                            </form>
                        </h2>
                    )}
                </div>
          </div>

      </div>
    );
  }
}

const mapState = (reduxState) => {
  console.log("reduxState", reduxState.auth)
  return {
    state: reduxState.auth,
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     loadOrder: () => dispatch(getAllOrders()),
//   };
// };

export default connect(mapState)(ThankyouPage);

//Add thunk 'getAllOrders' in the redux store

