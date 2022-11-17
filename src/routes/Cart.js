import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateRemaining } from "./../store.js"
import { changeInitialState, changeInitialState_2, plusAge } from "./../store/userSlice.js"


function Cart() {

    let user = useSelector((state) => { return state.user })
    let stock = useSelector((state) => { return state.stock })
    let remaining = useSelector((state) => { return state.remaining })
    let product_info = useSelector((state) => { return state.product_info })
    
    let dispatch = useDispatch()
    return (
        <div>
            <hr></hr>
            {user.name}의 장바구니 / {user.name}의 나이는 {user.age}살
            <hr></hr>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product_info.product.map((value, index) =>
                            <TableValue index={index} />
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
    function TableValue(props) {
        return (
            <tr key={props.index}>
                <td>{product_info.product[props.index].id}</td>
                <td>{product_info.product[props.index].name}</td>
                <td>{product_info.product[props.index].count}</td>
                <td>안녕</td>
                <td>
                    {/* <button onClick={() => {dispatch(changeInitialState())}}>변경</button> */}
                    <button onClick={() => {dispatch(plusAge(5))}}>변경</button>
                    <button onClick={() => {dispatch(updateRemaining(product_info.product[props.index].id))}}>+</button>
                </td>
            </tr>
        )
    }
}





export default Cart