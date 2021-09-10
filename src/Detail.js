import React, { useState } from "react"
import { useHistory, useParams } from "react-router-dom";

function Detail(p){
  console.log(useParams())
  let {idx} = useParams();
  let history = useHistory();
  let shoes = p.shoes[idx];
  return(
    <div className="container">
      <div className="row">
      <div className="col-md-6">
        <img src={"https://codingapple1.github.io/shop/shoes"+(Number(idx)+1)+".jpg"} width="100%"/>
      </div>
      <div className="col-md-6 mt-4">
        <h4 className="pt-5">{shoes.title}</h4>
        <p>{shoes.content}</p>
        <p>{shoes.price} 원</p>
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