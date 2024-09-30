const {createSlice} = require('@reduxjs/toolkit');

const setting = createSlice({
  name: 'setting',
  initialState: {
    sound: true,
    vibration: false,
    language: 'en',
  },
  reducers: {
    toggleSound(state) {
      state.sound = !state.sound;
    },
    toggleVibration(state) {
      state.vibration = !state.vibration;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {toggleSound, toggleVibration, setLanguage} = setting.actions;

export default setting.reducer;
