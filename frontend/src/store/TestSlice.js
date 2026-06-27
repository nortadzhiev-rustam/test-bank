import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
    name: 'test',
    initialState: {
        test: 'test'
    },
    reducers: {
        setTest: (state, action) => {
            state.test = action.payload;
        }
    }
});
