/* eslint-disable*/

import { useState } from "react";
import './App.css';
import { Row, Col, Navbar, Container, Nav } from 'react-bootstrap';
import data from "./data.js";
import DetailComponent from "./routes/Product_Detail.js";

import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'

function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();

  function shoesArraySort() {
    console.log(shoes)
    let shoes_array_sort = [...shoes].sort(function (a, b) {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      if (x < y) {
        return -1;
      }

      if (x > y) {
        return 1;
      }

      return 0;
    })

    setShoes(shoes_array_sort)
  }

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" >Shopping Mall</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>홈</Nav.Link>
            <Nav.Link onClick={() => { navigate('detail') }}>상세페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <div>
            <div className='main-bg'>
              <img src={process.env.PUBLIC_URL + '/bg.png'} width={"90%"} alt="" />
            </div>
            <button onClick={() => { shoesArraySort() }}>정렬</button>
            <Container className="product">
              <Row>

                {
                  shoes.map((value, index) => {
                    return (
                      <Col>
                        <ProductComponent i={index} shoes={shoes[index]} />
                      </Col>
                    )
                  })
                }
              </Row>
            </Container>
          </div>
        } />

        <Route path="/detail/:id" element={<DetailComponent shoes={shoes} />}></Route>

        {/* <Route path="/detail" element={
          <div>
            {
              shoes.map((value, index) => {
                return (
                  <Col>
                    <DetailComponent i={index} shoes={shoes[index]} />
                  </Col>
                )
              })
            }
          </div>
        }>

        </Route>  */}

        <Route path="*" element={<div>없는 페이지임 ㅋ</div>}></Route>

      </Routes>




    </div>
  );
}

function AboutComponent() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet>

      </Outlet>
    </div>
  )
}

function ProductComponent(props) {
  return (
    <div>
      <img src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id + 1) + ".jpg"} width={"80%"} alt="" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  )
}

export default App;
