// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    data: [],
    islogin:false
  },
  reducers: {
    create: (state,action) => {
      state.data.push(action.payload);
    },
    edit: (state,action) => {
     let ind= state.data.findIndex(item=>action.payload.blogid==item.blogid)
     state.data[ind]=action.payload
    },
    Islogin: (state,action) => {
      state.islogin= action.payload;
    },
  },
});

export const { create, edit,Islogin } = blogSlice.actions;
export default blogSlice.reducer;
