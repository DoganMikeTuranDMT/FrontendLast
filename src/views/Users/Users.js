import React, { Component } from "react";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import Footer from "../../components/Footer/Footer";
import '../../assets/css/test.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button
} from "reactstrap";

class Users extends Component {
  constructor(props) {
    super(props);
  }
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.history.push("/users/");
  };

  render() {
    return (
      <div >
       
        <PanelHeader size="sm" />
        <Footer/>
        
        <div className="container-2">
          
          <Row>
           
            <Form onSubmit={this.onSubmitHandler}>
         
            </Form>
          </Row>
        </div>
        <h1 className="primary">All users</h1>
        
      </div>
      
    );
  }
}

export default Users;
