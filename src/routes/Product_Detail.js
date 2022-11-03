import { useParams } from "react-router-dom"

function DetailComponent(props) {
  let {id} = useParams();

  let find_product = props.shoes.find(function(x){
    return x.id == id
  });

  props.shoes.find((x) => x.id == id )
  // props.shoes.forEach((element,index) => {
  //   if( id === element.id){
  //     console.log(element)
  //   }
  // });
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width={"100%"} alt="" />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{find_product.title}</h4>
              <p>{find_product.content}</p>
              <p>{find_product.price}</p>
              <button className="btn btn-danger">주문하기</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default DetailComponent