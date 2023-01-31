const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  carsData: [],
  loading: "idle",
};

const userslice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userslice.reducer;
