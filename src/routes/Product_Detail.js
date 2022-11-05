import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

function DetailComponent(props) {
  let {id} = useParams();
  let [alert, setAlert] = useState(true)
  let [num, setNum] = useState('')
  let [checkValue, setCheckValue] = useState(true)

  let find_product = props.shoes.find(function(x){
    return x.id == id
  });

  function Alert() {
    return(
      <div>
        {
          alert == true ? <div className="alert alert-warning"> 2초이내 구매 시 할인 !!!</div> : null
        }
      </div>
    )
  }

  function ErrorMent() {
    return(
      <div>
         <div className="alert alert-warning"> 숫자만 입력 가능합니다 </div>
      </div>
    )
  }

  props.shoes.find((x) => x.id == id )

    useEffect(() => {
      let timer = setTimeout(() => {
        setAlert(false)
      }, 2000)

      return () => {
        clearTimeout(timer)
      }
    }, [])

    useEffect(()=>{
      if (isNaN(num) == true){
        setCheckValue(true)
      }
      else(
        setCheckValue(false)
      )
    }, [num])


    return (
      <div>
        <div className="container">
        <Alert/>
          <div className="row">
            <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width={"100%"} alt="" />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{find_product.title}</h4>
              <p>{find_product.content}</p>
              <p>{find_product.price}</p>
              <button className="btn btn-danger" onClick={() => {}}>주문하기</button>
              <hr></hr>
              <p>구매 수량</p>
              <input onChange={(e)=>{ setNum(e.target.value) }}></input>
                {/* {
                  checkValue == true ? console.log("잘 입력 했음"), <ErrorMent></ErrorMent> : console.log("잘못 입력함")
                } */}
                      {
                  checkValue == true ? <ErrorMent/>: null
                }
            </div>
          </div>
        </div>
      </div>
    )
  }

export default DetailComponent