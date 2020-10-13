import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}></Container>
          <nav>
            <ul>
              <li>
                <a> Photo system</a>
              </li>
              <li>
                <a href="https://focus-foto.dk">About Us</a>
              </li>
             
            </ul>
          </nav>
          <div className="copyright">
            &copy; {1900 + new Date().getYear()}, Coded by {" "}
            
    <label style={{color: "#FF8C00", fontFamily: "verdana"}}>Dogan Mike Turan</label>
            

          </div>
        
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
