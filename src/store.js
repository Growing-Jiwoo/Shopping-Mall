import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import user from './store/userSlice.js'

// let remaining = createSlice({
//     name : 'remaining',
//     initialState : 0,
//     reducers : {
//         updateRemaining(state){
//             return state +=1
//         }
//     }
// })

let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
});

let product_info = createSlice({
    name: 'product_info',
    initialState: {product : [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 1, name: 'Grey Yordan', count: 1 }
    ], checkBoolean : true},
    reducers: {
        updateRemaining(state, action) {
            let num = state.product.findIndex((a) => { return a.id === action.payload })
            state.product[num].count++
        },
        insertProduct(state, action) {
            
            let check_overlap = state.product.findIndex((a) => { return a.id === action.payload.id })

            if (check_overlap === -1) {
                state.product.push(action.payload)
                state.checkBoolean = true

            } else {
                state.checkBoolean = false
            }
        },
    }

})

export let { updateRemaining, insertProduct } = product_info.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        product_info: product_info.reducer
    }
}) 