import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { category: '', questionType: '', difficulty: '', grade: 0 },
  isFull: false,
  isOpen: '',
  isVisible: false,
  isSwitched: false,
};

export const questionTypeSlice = createSlice({
  name: 'questionType',
  initialState,
  reducers: {
    questCategory: (state, action) => {
      state.value.category = action.payload;
    },
    questType: (state, action) => {
      state.value.questionType = action.payload;
    },
    questDifficulty: (state, action) => {
      state.value.difficulty = action.payload;
    },
    grade: (state, action) => {
      state.value.grade = action.payload;
    },
    setFull: (state, action) => {
      state.isFull = action.payload;
    },
    openWindow: (state, { payload }) => {
      state.isOpen = payload;
    },
    setVisible: (state, { payload }) => {
      state.isVisible = payload;
    },
    setSwitched: (state, { payload }) => {
      state.isSwitched = payload;
    },
  },
});

export const {
  questCategory,
  questType,
  questDifficulty,
  grade,
  setFull,
  openWindow,
  setVisible,
  setSwitched,
} = questionTypeSlice.actions;

export default questionTypeSlice.reducer;
