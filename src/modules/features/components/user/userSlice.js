import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

//GET all user
export const fetchALLUsers = createAsyncThunk("cars/getAPI", async () => {
  const response = await axios.get("http://localhost:4000/users");
  return response.data;
});

//Create User
export const saveNewUser = createAsyncThunk(
  "users/createAPI",
  async (payload) => {
    const response = await axios.post("http://localhost:4000/users", payload);
    return response.data;
  }
);

const initialState = {
  usersData: [],
  loading: "idle",
};

const userslice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchALLUsers.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchALLUsers.fulfilled, (state, action) => {
      state.loading = "idle";
      state.usersData = action.payload;
    });
    builder.addCase(saveNewUser.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(saveNewUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.usersData.unshift(action.payload);
    });
  },
});

export const { allUsersLoading, allUsersRecieved } = userslice.actions;

export const getAllUsers = (state) => state.user.usersData;
export const getLoading = (state) => state.user.loading;

export default userslice.reducer;
