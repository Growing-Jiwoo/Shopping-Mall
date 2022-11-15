import { configureStore, createSlice } from '@reduxjs/toolkit'

let remaining = createSlice({
    name : 'remaining',
    initialState : 0,
    reducers : {
        updateRemaining(state){
            return state +=1
        }
    }
})

export let {updateRemaining} = remaining.actions

let user = createSlice({
    name : 'user',
    initialState : 'kim',
    reducers : {
        changeInitialState(state){
            // return 'kimjiwoo'    
            return state + 'jiwoo'
        },
        changeInitialState_2(){
            // return 'kimjiwoo'    
            return 'ohjihyun'
        },
    }
});

export let {changeInitialState, changeInitialState_2} = user.actions

let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
});

let product_info = createSlice({    
    name : 'product_info',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ]
})


export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    product_info : product_info.reducer,
    remaining : remaining.reducer
   }
}) 