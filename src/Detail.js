import axios from "axios";
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import './Detail.scss';
import {Nav} from 'react-bootstrap'
import { CSSTransition } from "react-transition-group";


let Boxdiv = styled.div`
  padding : 20px;
`;

let Boxh4 = styled.h4`
  font-size : 25px;
  color:${ props => props.color };
`

function Detail(p){

  let [tabAniSw, tabAniSwCng] = useState(false)

  let [tab, tabCng] = useState(0)

  useEffect(()=>{

    let timer = setTimeout(()=>{
      alertToggleCn(false)
    },2000)

    return function DetailUnmount(){
      console.log('언마운트')
    }

  },[]);
  // ,[]를 추가하면 업데이트시에는 실행하지 않음, 첫 로드에만 실행함


  let {idx} = useParams();
  let history = useHistory();
  let thisShoe = p.shoes.find(shoe => shoe.id == idx);

  let [alertToggle, alertToggleCn] = useState(true);
  return(
    <div className="container">

      <Boxdiv>
        <Boxh4 color="#000">Detail</Boxh4>
      </Boxdiv>

      {
        alertToggle
        ?<div className="myAlert2"><p>재고가 얼마 남지 않았습니다.</p></div>
        :null
      }
      

      <div className="row">
        <div className="col-md-6">
          <img src={"https://codingapple1.github.io/shop/shoes"+(Number(idx)+1)+".jpg"} width="100%"/>
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{thisShoe.title}</h4>
          <p>{thisShoe.content}</p>
          <p>{thisShoe.price} 원</p>

          <Stock stock={p.stock} id={idx}/>

          <button onClick={()=>{
            let newArr = [...p.stock]
            newArr[idx] = newArr[idx] - 1;
            p.stockCng(newArr);
          }} className="btn btn-danger" style={{'marginRight':'10px'}}>주문하기</button>

          <button className="btn btn-danger" onClick={()=>{
            // history.push('/'); // 해당 페이지로 이동
            history.goBack(); // 이전 페이지로 이동
          }}>뒤로가기</button>
        </div>
      </div>
      <Nav className="mt-5" variant="tabs" defaultActiveKey={tab}>
        <Nav.Item>
          <Nav.Link onClick={
            ()=>{
              tabCng(0)
              tabAniSwCng(false)
            }
          } eventKey="0">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={
            ()=>{
              tabCng(1)
              tabAniSwCng(false)
            }
          } eventKey="1">Option 2</Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={tabAniSw} classNames="wow" timeout={500}>
        <TabContent tab={tab} tabAniSwCng={tabAniSwCng}/>
      </CSSTransition>


    </div> 
    
  )
}

function TabContent(props){
  useEffect(()=>{
    props.tabAniSwCng(true);
  })
  if(props.tab == 0){
    return <div>0</div>
  } else if (props.tab == 1){
    return <div>1</div>
  }
}

function Stock(p){
  return (
    <p>재고 : {p.stock[p.id]}</p>
  )
}
export default Detail;