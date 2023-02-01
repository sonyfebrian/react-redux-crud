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

//Update User
export const updateUser = createAsyncThunk(
  "users/updateAPI",
  async (payload) => {
    const response = await axios.put(
      `http://localhost:4000/users/${payload.id}`,
      payload
    );
    return response.data;
  }
);

//Delete User
export const deleteUser = createAsyncThunk("users/deleteAPI", async (id) => {
  const response = await axios.delete(`http://localhost:4000/users/${id}`);
  return id;
});

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
    builder.addCase(updateUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.usersData = state.usersData.filter(
        (_) => _.id !== action.payload.id
      );
      state.usersData.unshift(action.payload);
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.usersData = state.usersData.filter((_) => _.id !== action.payload);
    });
  },
});

export const { allUsersLoading, allUsersRecieved } = userslice.actions;

export const getAllUsers = (state) => state.user.usersData;
export const getLoading = (state) => state.user.loading;
export const getUserById = (id) => {
  return (state) => state.user.usersData.filter((_) => _.id === id)[0];
};

export default userslice.reducer;
