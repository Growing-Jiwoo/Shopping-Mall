import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeInitialState, changeInitialState_2, updateRemaining } from "./../store.js"


function Cart() {

    let user = useSelector((state) => { return state.user })
    let stock = useSelector((state) => { return state.stock })
    let remaining = useSelector((state) => { return state.remaining })
    let product_info = useSelector((state) => { return state.product_info })
    
    let dispatch = useDispatch()
    return (
        <div>
            <hr></hr>
            {user}의 장바구니
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
                        product_info.map((value, index) =>
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
                <td>{product_info[props.index].id}</td>
                <td>{product_info[props.index].name}</td>
                {/* <td>{product_info[props.index].count}</td> */}
                <td>{remaining}</td>
                <td>안녕</td>
                <td>
                    <button onClick={() => {dispatch(changeInitialState())}}>변경</button>
                    <button onClick={() => {dispatch(updateRemaining())}}>+</button>
                </td>
            </tr>
        )
    }
}





export default Cart