import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "freelancerApp/categories/getCategories",
  async () => {
    const response = await axios.get("/api/academy/categories");
    const data = await response.data;

    return data;
  }
);

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  categoriesAdapter.getSelectors((state) => state.freelancerApp.categories);

const categorySlice = createSlice({
  name: "freelancerApp/categories",
  initialState: categoriesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: categoriesAdapter.setAll,
  },
});

export default categorySlice.reducer;
