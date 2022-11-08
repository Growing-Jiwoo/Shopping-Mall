import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Nav } from 'react-bootstrap';

import styled from "styled-components"; /* 1.keyframes를 import하고 */


const TabTextAnimation = styled.div`
  div {
    opacity : 1;
    &:hover {
      opacity : 0;
      transition : opacity 0.5s;
    }
  }
`

function DetailComponent(props) {
  let [changeTab, setChangeTab] = useState(0)
  let { id } = useParams();
  let [alert, setAlert] = useState(true)
  let [num, setNum] = useState('')
  let [checkValue, setCheckValue] = useState(true)

  let find_product = props.shoes.find(function (x) {
    return x.id == id
  });

  function Alert() {
    return (
      <div>
        {
          alert === true ? <div className="alert alert-warning"> 2초이내 구매 시 할인 !!!</div> : null
        }
      </div>
    )
  }

  function ErrorMent() {
    return (
      <div>
        <div className="alert alert-warning"> 숫자만 입력 가능합니다 </div>
      </div>
    )
  }

  props.shoes.find((x) => x.id === id)

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isNaN(num) === true) {
      setCheckValue(true)
    }
    else (
      setCheckValue(false)
    )
  }, [num])


  return (
    <div>
      <div className="container">
        <Alert />
        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width={"100%"} alt="" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{find_product.title}</h4>
            <p>{find_product.content}</p>
            <p>{find_product.price}</p>
            <button className="btn btn-danger" onClick={() => { }}>주문하기</button>
            <hr></hr>
            <p>구매 수량</p>
            <input onChange={(e) => { setNum(e.target.value) }}></input>
            {/* {
                  checkValue == true ? console.log("잘 입력 했음"), <ErrorMent></ErrorMent> : console.log("잘못 입력함")
                } */}
            {
              checkValue === true ? <ErrorMent /> : null
            }
          </div>
          <hr style={{ marginTop: "25px" }}></hr>
          <Nav variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
              <Nav.Link onClick={() => { setChangeTab(0) }} eventKey="link-0">Option 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => { setChangeTab(1) }} eventKey="link-1">Option 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => { setChangeTab(2) }} eventKey="link-2">Option 3</Nav.Link>
            </Nav.Item>
          </Nav>
          <TabContents tabname={changeTab} />
          {/* <Box>
            <span>👩🏻‍💻</span>
          </Box> */}
        </div>
      </div>
    </div>
  )
}

// function TabContents(props){
//   if(props.tabname === 0){
//     return <div>탭0</div>
//   }
//   if(props.tabname === 1){
//     return <div>탭1</div>
//   }
//   if(props.tabname === 2){
//     return <div>탭2</div>
//   }
// }


function TabContents({ tabname }) {
  return <div>
    <TabTextAnimation>
      {[<div>탭0</div>, <div>탭1</div>, <div>탭2</div>][tabname]}
    </TabTextAnimation>
  </div>
}


export default DetailComponent