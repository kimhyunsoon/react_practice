/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import {Navbar, Container, Nav,NavDropdown, Button} from 'react-bootstrap'
import { useState } from 'react';
import {shoesData} from './data.js'

function App() {

  let [shoes, shoesCng] = useState(shoesData);

  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="jumbotron">
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for calling
          extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div>
      
      <div className="container">

        <div className="row">

        {
          shoes.map((row, idx)=>{
            return <Shoes shoes={row} key={idx}/>
          })
        }

        </div>
      </div>


    </div>
  );
}

function Shoes(props){
  return(
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.shoes.id + 1) +'.jpg'} width="100%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
    </div>  
  )

}

export default App;