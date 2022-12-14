/* eslint-disable*/

import { lazy, Suspense, useEffect, useState } from "react";
import './App.css';
import { Row, Col, Navbar, Container, Nav, Card, Button} from 'react-bootstrap';
import data from "./data.js";
import axios from "axios";

// import DetailComponent from "./routes/Product_Detail.js";
// import Cart from "./routes/Cart.js";

const DetailComponent = lazy( () => import('./routes/Product_Detail.js') ) // lazy import
const Cart = lazy( () => import('./routes/Cart.js') ) // lazy import

import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useQuery } from "react-query";

function App() {

  useEffect(() => {

    if(get_obj.length == 0){
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  let get_obj = JSON.parse(localStorage.getItem('watched'))

  let [shoes, setShoes] = useState(data)
  let [count, setCount] = useState(2); 
  let [overnum, setOvernum] = useState(true)
  let navigate = useNavigate();

  // let result = useQuery('getname', () => {
  //   axios.get('https://codingapple1.github.io/userdata.json')
  //     .then((a) => { return a.data })
  // })

  // console.log(result.data)

  let result = useQuery('getname', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ 
      console.log("요청됨")
      return a.data 
    }),
    {staleTime : 2000}
  )

  function getData(count) {
    axios.get(`https://codingapple1.github.io/shop/data${count}.json`)
      .then((data) => {
        data.data.map((value, index) => {
          let new_shoes = [...shoes, ...data.data]
          setShoes(new_shoes)
        })
      })
  }

  function shoesArraySort() {
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

  function ProductComponent(props) {
    return (
      <div>
        <img onClick={() => {navigate(`/detail/${props.shoes.id}`)}} src={"https://codingapple1.github.io/shop/shoes" + (props.shoes.id + 1) + ".jpg"} width={"80%"} alt="" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
      </div>
    )
  }

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" >Shopping Mall</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>홈</Nav.Link>
            <Nav.Link onClick={() => { navigate('detail') }}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => { navigate('cart') }}>장바구니</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {/* { result.isLoading ? '로딩중' : result.data.name }님 안녕하세요 ! */}
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name + '님 안녕하세요 !' }
            </Nav>
        </Container>
      </Navbar>
      
      <Suspense fallback={<div>로딩중</div>}>
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
            <button onClick={() => {
              setCount(count + 1)

              if (count == 2) {
                getData(count)
              }
              else if (count == 3) {
                getData(count)
              }
              else {
                setOvernum(false)
              }

            }}>버튼</button>

            {
              overnum == false ? <div>상품 없음</div> : null
            }


            {
              get_obj.map((value, index) => {
                return(
                  <RecentlyViewed i={index} props={get_obj[index]}/>
                )
              })
            }


          </div>
        } />
          <Route path="/detail/:id" element={<DetailComponent shoes={shoes} />}></Route>

        <Route path="/cart" element={<Cart/>}></Route>

        <Route path="*" element={<div>없는 페이지임 ㅋ</div>}></Route>

      </Routes>
      </Suspense>

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

function RecentlyViewed(props) {
  // console.log(props.props)
  // console.log("H12313131I")
    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{props.props.title}</Card.Title>
            <Card.Text>
                  {props.props.price}원
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )

}



export default App;
