const {createSlice} = require('@reduxjs/toolkit');

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
