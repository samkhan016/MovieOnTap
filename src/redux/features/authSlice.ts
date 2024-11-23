import {createAction, createSlice} from '@reduxjs/toolkit';

export const resetUserState = createAction('user/resetState');

export interface LoginState {
  isloaderVisible: boolean;
}

const initialState: LoginState = {
  isloaderVisible: false,
};

const loginSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setLoaderVisible: (state, action) => {
      state.isloaderVisible = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(resetUserState, () => {
      return {...initialState};
    });
  },
});

export const {setLoaderVisible} = loginSlice.actions;
export default loginSlice.reducer;
