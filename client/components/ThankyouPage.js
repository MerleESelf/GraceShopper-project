import React from "react";
import { connect } from "react-redux";
//import { getOrder } from "";
import { Link } from "react-router-dom";

class ThankyouPage extends React.Component {
  constructor(){
      super()
  }


  render() {
    const username = this.props.state.username
      return(
      <div id="thank">
          <h1>Thank You</h1>
          <div>
            <h3>
              A confirmation has been sent to your email!
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



export default connect(mapState)(ThankyouPage);



