import React, { useState } from "react"
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
  var {idx} = useParams();
  var history = useHistory();
  var thisShoe = p.shoes.find(shoe => shoe.id == idx);

  return(
    <div className="container">

      <Boxdiv>
        <Boxh4 color="#000">Detail</Boxh4>
      </Boxdiv>

      <div className="myAlert2">
        <p>재고가 얼마 남지 않았습니다.</p>
      </div>

      <div className="row">
      <div className="col-md-6">
        <img src={"https://codingapple1.github.io/shop/shoes"+(Number(idx)+1)+".jpg"} width="100%"/>
      </div>
      <div className="col-md-6 mt-4">
        <h4 className="pt-5">{thisShoe.title}</h4>
        <p>{thisShoe.content}</p>
        <p>{thisShoe.price} 원</p>
        <button className="btn btn-danger" style={{'marginRight':'10px'}}>주문하기</button>
        <button className="btn btn-danger" onClick={()=>{
          // history.push('/'); // 해당 페이지로 이동
          history.goBack(); // 이전 페이지로 이동
        }}>뒤로가기</button>
      </div>
      </div>
    </div> 
  )
}

export default Detail;