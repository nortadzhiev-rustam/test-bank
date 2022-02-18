import { createSlice } from '@reduxjs/toolkit';

const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        department: [],
        loading: false,
        error: null,
    },
    reducers: {
        getDepartmentStart: (state) => {
            state.loading = true;
        },
        getDepartmentSuccess: (state, action) => {
            state.department = action.payload;
            state.loading = false;
        },
        getDepartmentFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { getDepartmentStart, getDepartmentSuccess, getDepartmentFailure } = departmentSlice.actions;

export default departmentSlice.reducer;