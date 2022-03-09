import React from "react";

export class CartPoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        id: this.props.Poster.id,
        quantity: this.props.Poster.poster.quantity,
        price: this.props.Poster.poster.price,
    },
    this.handleChange = this.handleChange.bind(this);
    this.calcPrice = this.calcPrice.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  calcPrice(price, qty){
    return (price * qty) / 100;
  }
  render() {
    const { handleEdit, Poster} = this.props
    const { quantity, price } = this.state
    return(
    <div >
      <div>
        <img src={Poster.poster.imageUrl} />
      </div>
      <div>Poster Name: {Poster.poster.name} </div>
      <div>Poster Size: {Poster.poster.size} </div>
      <div>Poster Creator: {Poster.poster.creator} </div>
      <div>Poster Description: {Poster.poster.description}</div>
      <div>Poster Price: ${this.calcPrice(price, quantity)} </div>
      <div>
        <input
          type="number"
          name="quantity"
          value={quantity}
          min="1"
          max="100"
          onChange={this.handleChange}
        />
        <button type="button" onClick={() => {handleEdit(this.state)}}>update qty</button>
      </div>
    </div>
    )
  }
}
