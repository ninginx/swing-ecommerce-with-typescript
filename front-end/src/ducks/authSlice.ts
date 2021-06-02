import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type userState = { id: string; name: string; isSignin: boolean };
const initialState: userState = { id: '', name: '', isSignin: false };

export const authSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<userState>) => ({
      id: action.payload.id,
      name: action.payload.name,
      isSignin: true,
    }),
    signout: (_state, _action: PayloadAction<userState>) => ({
      id: '',
      name: '',
      isSignin: false,
    }),
  },
});
