import { configureStore } from '@reduxjs/toolkit';
import questionTypeReducer from './questionTypeSlice';
import userReducer from './userSlice';
import departmentReducer from './departmentSlice';
export const store = configureStore({
  reducer: {
    questionsType: questionTypeReducer,
    user: userReducer,
    department: departmentReducer,
  },
});
