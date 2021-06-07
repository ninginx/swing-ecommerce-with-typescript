import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type userState = {
  id: string;
  name: string;
  isSignin: boolean;
  email: string;
};
const initialState: userState = {
  id: '',
  name: '',
  email: '',
  isSignin: false,
};

export const authSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    signin: (_state, action: PayloadAction<userState>) => action.payload,
    signout: (_state, _action: PayloadAction<userState>) => ({
      id: '',
      name: '',
      email: '',
      isSignin: false,
    }),
  },
});
