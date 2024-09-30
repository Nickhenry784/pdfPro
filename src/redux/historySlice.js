const {createSlice} = require('@reduxjs/toolkit');

const history = createSlice({
  name: 'history',
  initialState: {
    items: [],
    itemIdCounter: 1,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: state.itemIdCounter,
        ...action.payload,
      };
      state.items.push(newItem);
      state.itemIdCounter++;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const {id, updatedValues} = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = {...state.items[index], ...updatedValues};
      }
    },
  },
});

export const {addItem, deleteItem, updateItem} = history.actions;

export default history.reducer;
