import axios from "axios";
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import './Detail.scss';

let Boxdiv = styled.div`
  padding : 20px;
`;

let Boxh4 = styled.h4`
  font-size : 25px;
  color:${ props => props.color };
`

function Detail(p){
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
    </div> 
  )
}
function Stock(p){
  return (
    <p>재고 : {p.stock[p.id]}</p>
  )
}
export default Detail;