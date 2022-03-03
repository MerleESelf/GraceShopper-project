import React from "react";
//import { connect } from "react-redux";
//import { getOrder } from "";
import { Link } from "react-router-dom";

export default class ThankyouPage extends React.Component {
  constructor(){
      super()
      this.state = {
        isLoggedIn: false
      }
  }

//   componentDidMount() {
//     this.props.loadOrder();
//   }

  render() {
    const isLoggedIn = this.state.isLoggedIn
      // const order = this.props.state.order
      // const isLoggedIn = this.props.state.isLoggedIn
    // return this.props.state === undefined || this.props.state.length === 0 ? (
    //   "NO ORDERS"
    // ) : (
      return(
      <div id="thank">
          <h1>Thank You!</h1>
          <div>
            <h3>
              A confirmation has been sent to your email or click <Link to="/orderconfirmation">here</Link> to view the order.
            </h3>
              <div>
                  {isLoggedIn ? 
                    ('')
                    :(
                        <h2>
                            Since you are here, join our list for discounts!
                            <form>
                                <input type="text" placeholder="Email" />
                                <button value="submit">Yes! Sign Me Up</button>
                            </form>
                        </h2>
                    )}
                </div>
          </div>

      </div>
    );
  }
}

// const mapState = (reduxState) => {
//   console.log("reduxState", reduxState)
//   return {
//     state: reduxState.orders,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadOrder: () => dispatch(getAllOrders()),
//   };
// };

// export default connect(mapState, mapDispatch)(OrderConfirmation);

//Add thunk 'getAllOrders' in the redux store

