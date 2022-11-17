import { configureStore, createSlice } from '@reduxjs/toolkit'


let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},
    reducers : {
        changeInitialState(state){
            state.name = 'park' // 직접적으로 수정
        },
        changeInitialState_2(){
            // return 'kimjiwoo'    
            return 'ohjihyun'
        },
        plusAge(state, num){

            state.age += num.payload

        }
    }
});

export let {changeInitialState, changeInitialState_2, plusAge} = user.actions

export default user