import React from "react";
//import { connect } from "react-redux";
//import { getOrder } from "";
import { Link } from "react-router-dom";

const dummyData = {
  order: {
    id: "9870",
    updatedAt: "2022-03-02 15:53:13.856-05",
    moneyTotal: "300",
    poster: {
      name: "groomingbymoonlight",
      size: '18" x 12"',
      price: "20",
    },
    cartDetails: {
      quantityTotal: "3",
    },
  },
  isLoggedIn: false,
};

export default class OrderConfirmation extends React.Component {
  constructor() {
    super();
    this.state = dummyData;
    console.log("here");
  }

  //   componentDidMount() {
  //     this.props.loadOrder();
  //   }

  render() {
    console.log("this.state", this.state);
    const order = this.state.order;
    const isLoggedIn = this.state.isLoggedIn;
    // const order = this.props.state.order
    // const isLoggedIn = this.props.state.isLoggedIn
    // return this.props.state === undefined || this.props.state.length === 0 ? (
    //   "NO ORDERS"
    // ) : (
    return (
      <div id="orderConfirm">
        <h1>Thank you for your order</h1>
        <div>Details of your order are listed below:</div>
        <div>
          <h3>Order Details:</h3>
          <div>
            <p>Poster: {order.poster.name}</p>
            <p>Size: {order.poster.size}</p>
            <p>Qty: {order.cartDetails.quantityTotal}</p>
            <p>
              Price: {order.poster.price}*{order.cartDetails.quantityTotal}
            </p>
          </div>
          <div>
            <h3>Order Summary:</h3>
            <div>
              <p>Order Number:{order.id}</p>
              <p>Order Date: {order.updatedAt.substring(0, 10)}</p>
              <p>Total: ${order.moneyTotal}</p>
            </div>
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
