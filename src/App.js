/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import {Navbar, Container, Nav,NavDropdown, Button} from 'react-bootstrap'
import React, { useContext, useState } from 'react';
import {shoesData} from './data.js'
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js'
import axios from 'axios';

let StockContext = React.createContext();

function App() {

	let [shoes, shoesCng] = useState(shoesData);

  let [shoesStock, shoesStockCng] = useState([10,11,12]);

  let [loading, loadgingCng] = useState(false);
  
  function shoesSort(order){
    var newArr = [...shoes]
    if(order=='desc'){
      newArr.sort(function (a, b) {
        return a.title > b.title ? -1 : a.title > b.title ? 1 : 0;
      });
    }else if(order == 'asc'){
      newArr.sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
      });
    
    }
    shoesCng(newArr)
  }
	return (
		<div className="App">

			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand> <Link to='/'>ShoseShop</Link> </Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
              {/* Nav.Link 안에 Link 컴포넌트 -> a태그 안에 a태그 워닝 뜸, as 속성으로 해결함 */}
              <Nav.Link as={Link} to='/'>Home</Nav.Link> 
							<Nav.Link as={Link} to='/detail'>Detail</Nav.Link>
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

            <StockContext.Provider value={shoesStock}>

            <div className="row">
              {
                shoes.map((row, idx)=>{
                  return <Shoes shoes={row} key={row.id}/>
                })
              }
            </div>

            </StockContext.Provider>

          </div>

          {/* axios 비동기통신 */}
          <div style={{marginBottom:'10px'}}>
            <button onClick={()=>{

              loadgingCng(true)

              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((r)=>{

                loadgingCng(false)
                var newArr = [...shoes, ...r.data];
                shoesCng(newArr)

              })
              .catch((e)=>{

                console.error(e)
                loadgingCng(false)

              })
              // post 는 axios.past('url', {json 정보}).then();
            }} className="btn btn-primary">더보기</button>
          </div>

          {
            loading
            ? <p>로딩중</p>
            : null
          }
          
          
          <button onClick={()=>{
            shoesSort('asc')
          }}>오름순</button>
          <button onClick={()=>{
            shoesSort('desc')
          }}>내림순</button>
        </Route>

        {/* :(파라미터) 모든 문자경로 */}
        <Route exact path="/detail/:idx">
          <Detail shoes={shoes} stock={shoesStock} stockCng={shoesStockCng}/>
        </Route>

        <Route exact path="/:id">
          <p>페이지가 없습니다.</p>
        </Route>


      </Switch>

		</div>
	);
}

function Shoes(props){

  let stock = useContext(StockContext);
	return(
		<Link to={"/detail/" + props.shoes.id} className="col-md-4">
			<img src={'https://codingapple1.github.io/shop/shoes'+ (props.shoes.id + 1) +'.jpg'} width="100%" />
			<h4>{props.shoes.title}</h4>
			<p>{props.shoes.content} & {props.shoes.price}</p>
      <p>재고 : {stock[props.shoes.id]}</p>
      <Test></Test>
		</Link>  
	)

}

function Test(){
  let stock = useContext(StockContext);
  return (
    <p>재고 : {stock}</p>
  )
}

export default App;