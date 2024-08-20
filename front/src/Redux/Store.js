import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Global'
export const store = configureStore({
  reducer: {
    
    counter:counterReducer
  }
    
  
})