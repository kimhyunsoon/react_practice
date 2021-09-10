/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import {Navbar, Container, Nav,NavDropdown, Button} from 'react-bootstrap'
import { useState } from 'react';
import {shoesData} from './data.js'
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js'

function App() {

	let [shoes, shoesCng] = useState(shoesData);

	return (
		<div className="App">

			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand> <Link to='/'>ShoseShop</Link> </Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link> <Link to='/'>Home</Link> </Nav.Link>
							<Nav.Link> <Link to='/detail'>Detail</Link>  </Nav.Link>
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item >Action</NavDropdown.Item>
								<NavDropdown.Item >Another action</NavDropdown.Item>
								<NavDropdown.Item >Something</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item >Separated link</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			
      {/* 중복이 된다면 맨위에거만 보여줌_Switch */}
      <Switch>

        {/* path가 정확히 일치할때만 보여줌_exact */}
        <Route exact path="/">
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
        </Route>

        {/* :(파라미터) 모든 문자경로 */}
        <Route exact path="/detail/:idx">
          <Detail shoes={shoes}/>
        </Route>

        <Route exact path="/:id">
          <p>페이지가 없습니다.</p>
        </Route>


      </Switch>

		</div>
	);
}

function Shoes(props){
	return(
		<Link to={"/detail/" + props.shoes.id} className="col-md-4">
			<img src={'https://codingapple1.github.io/shop/shoes'+ (props.shoes.id + 1) +'.jpg'} width="100%" />
			<h4>{props.shoes.title}</h4>
			<p>{props.shoes.content} & {props.shoes.price}</p>
		</Link>  
	)

}

export default App;