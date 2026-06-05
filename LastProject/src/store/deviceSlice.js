import { createSlice } from "@reduxjs/toolkit";

const deviceSlice = createSlice({
  name: "devices",
  initialState: {
    list: [
      {
        id: "1",
        name: "iPhone 15 Pro",
        brand: "Apple",
        category: "სმარტფონი",
        price: 2999,
        stock: 12,
        desc: "უახლესი ტიტანის კორპუსით და A17 Pro ჩიპით.",
      },
      {
        id: "2",
        name: "MacBook Air M3",
        brand: "Apple",
        category: "ლეპტოპი",
        price: 3499,
        stock: 5,
        desc: "ულტრა თხელი, მძლავრი და უხმო ლეპტოპი ყოველდღიური სამუშაოსთვის.",
      },
      {
        id: "3",
        name: "Galaxy S24 Ultra",
        brand: "Samsung",
        category: "სმარტფონი",
        price: 2799,
        stock: 8,
        desc: "AI ფუნქციებით აღჭურვილი ფლაგმანი საუკეთესო კამერით.",
      },
    ],
  },
  reducers: {
    addDevice: (state, action) => {
      state.list.push(action.payload);
    },
    deleteDevice: (state, action) => {
      state.list = state.list.filter((device) => device.id !== action.payload);
    },
  },
});

export const { addDevice, deleteDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
