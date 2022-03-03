import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSinglePoster, updateSinglePoster } from "../store/singlePoster";

class SinglePoster extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.props.fetchSinglePoster(this.props.match.params.id);
  }
  update() {
    this.props.updateSinglePoster(this.props.match.params.id);
    if (!localStorage.getItem("cart")) {
      localStorage.setItem(
        "cart",
        JSON.stringify([
          {
            posterId: this.props.match.params.id,
            itemQuantity: 1,
          },
        ])
      );
    } else {
      var existing = JSON.parse(localStorage.getItem("cart"));
      var [updateQuant] = existing.filter(
        (e) => e.posterId === this.props.match.params.id
      );
      //need to check if the posterId already exists, if it does just update quantit
      if (updateQuant) {
        updateQuant.itemQuantity++;
        localStorage.setItem("cart", JSON.stringify(existing));
      } else {
        existing.push({
          posterId: this.props.match.params.id,
          itemQuantity: 1,
        });
        localStorage.setItem("cart", JSON.stringify(existing));
      }
    }
  }

  render() {
    const { poster } = this.props;

    return (
      <div>
        <div id="wrap">
          <div id="product_layout_3">
            <div className="product_image">
              <div className="main_image">
                <img src={poster.imageUrl} />
              </div>
            </div>
            <div className="product_desc">
              <h1>{poster.name}</h1>
              <span className="sale_price">
                PRICE (cmon you know it's totally worth it for this SWEET poster
                of a cat in a hat): {poster.price}
              </span>
              <div className="product_options">
                <div className="select">
                  <select id="size">
                    <option value="1">54" x 36"</option>
                    <option value="2">36" x 24"</option>
                    <option value="3">24" x 16"</option>
                    <option value="4">18" x 12"</option>
                  </select>
                </div>
              </div>
              <div className="other_options">
                <span className="QTY">NUMBER IN STOCK: {poster.quantity}</span>
              </div>
              <div className="cart">
                <a href="#" className="add">
                  {/*  */}
                  <input
                    type="button"
                    value="ADD TO CART"
                    onClick={this.update}
                  />
                  {/*  */}
                </a>
              </div>
            </div>
            <div className="description">{poster.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  poster: state.singlePoster,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSinglePoster: (id) => dispatch(fetchSinglePoster(id)),
  updateSinglePoster: (id) => dispatch(updateSinglePoster(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePoster);
