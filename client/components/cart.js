import React from "react";
import { connect } from "react-redux";
import { CartPoster } from "./CartPoster";
import {
  checkOutThunk,
  fetchCompleteOrder,
  fetchOpenOrder,
  removedPosterThunk,
  editPosterQtyThunk,
} from "../store/order";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      subtotal: 0,
    };

    this.removeFromCart = this.removeFromCart.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.editPosterQty = this.editPosterQty.bind(this);
    this.calcSubtotal = this.calcSubtotal.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.path.split("/")[2];
    this.props.loadOpenOrder(userId);
    this.calcSubtotal() 
  }

  removeFromCart(orderId, posterId) {
    this.props.removedPosterThunk(orderId, posterId);
  }

  handleSubmit(event) {
    event.preventDefault();
    const userId = this.props.match.path.split("/")[2];
    const orderId = this.props.order.openOrder.id;
    this.props.checkOut(userId, orderId);
  }

  editPosterQty (poster) {
    const userId = this.props.match.path.split("/")[2];
    const orderId = this.props.order.openOrder.id;
    const posterId = poster.id
    this.props.editOrderThunk(userId, orderId, posterId, poster)
  }
  calcSubtotal(){
    let result = 0; 
    this.props.order?.cartPosters &&
    this.props.order.cartPosters.forEach((poster) => {
      result += poster.poster.price
    });
    return result
    // return this.setState({subtotal: result});
  }

  render() {
    // console.log("****", Array.isArray(this.props.order.cartPosters))
    return (
      <div>
        <h1>Shopping Cart</h1>

        <div className="shopping-cart">
          {this.props.order?.cartPosters &&
            this.props.order.cartPosters.map((orderDetail) => {
              return (
                <div key={orderDetail.id}>
                  <CartPoster Poster={orderDetail} handleEdit={this.editPosterQty}/>
                  <div>
                    <button
                      onClick={() =>
                        this.removeFromCart(
                          orderDetail.orderId,
                          orderDetail.poster.id
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                  <br />
                </div>
              );
            })}
        </div>
        <div>
          {/* <h3>Order Summary</h3>
          <table className="fixed_headers">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.props.order?.cartPosters &&
                this.props.order.cartPosters.map((orderDetail) => {
                  return (
                    <tr key={orderDetail.id}>
                      <td>{orderDetail.poster.name} </td>
                      <td>${orderDetail.poster.price}.00</td>
                      <td>{orderDetail.poster.length}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table> */}
          <div>
            Subtotal:
            ${this.calcSubtotal()}
          </div>
          <form>
            <button value="submit" onClick={this.handleSubmit}>
              Check Out
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  loadOpenOrder: (userId) => dispatch(fetchOpenOrder(userId)),

  removedPosterThunk: (orderId, posterId) =>
    dispatch(removedPosterThunk(orderId, posterId)),

  checkOut: (userId, orderId) =>
    dispatch(checkOutThunk(userId, orderId, history)),

  editOrderThunk: (userId, orderId, posterId, poster) => {
    dispatch(editPosterQtyThunk(userId, orderId, posterId, poster));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
