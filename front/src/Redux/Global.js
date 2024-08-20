import { createSlice } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
const initialState = {
  value: null,
  users:[],
  shareValue:false
  ,allusers:0,
  encall:false
  ,re:false,
  closed:true

 
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
    setshareredux:(state)=>{
      state.shareValue=!state.shareValue
      
    },
    closestate:(state)=>{
      state.closed=!state.closed
      
    },
    resize: (state, action) => {
      state.value=action.payload
    },
    seusers: (state) => {
      state.allusers+=1;
    },
    endvedio: (state) => {
      state.encall=true;
    },
    re: (state) => {
      state.re=!state.re;
    }
    
    
  },
})

// Action creators are generated for each case reducer function
export const {resize,setshareredux,seusers,endvedio,re,closestate} = counterSlice.actions

export default counterSlice.reducer