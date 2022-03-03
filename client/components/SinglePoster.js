import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSinglePoster, updateSinglePoster } from "../store/singlePoster";

class SinglePoster extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSinglePoster(this.props.match.params.id);
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
              <span className="price">$70</span>
              <span className="sale_price">{poster.price}</span>
              <span className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half"></i>
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
              <div className="buying">
                <div className="quantity">
                  <label htmlFor="quantity">QTY:</label>
                  <input type="text" />
                </div>
                <div className="cart">
                  <a href="#" className="add">
                    {/*  */}
                    <input
                      type="button"
                      value="ADD TO CART"
                      onClick={this.props.updateSinglePoster(
                        this.props.match.params.id
                      )}
                    />
                    {/*  */}
                  </a>
                </div>
              </div>
              <div className="other_options">
                <span className="SKU">SKU:12345</span>
                <span className="QTY">QTY:35</span>
              </div>
              <div className="description">{poster.description}</div>
            </div>
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
