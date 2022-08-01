import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { parse } from "crypto-js/enc-base64";
import { log } from "util";

export const getProducts = createAsyncThunk(
  "eCommerceApp/products/getProducts",
  async () => {
    // const response = await axios.get("/api/ecommerce/products");
    // const data = await response.data;

    // const myJSON = JSON.stringify(data);

    return [
      {
        "id": "1",
        "name": "E-commerce website",
        "comapny": "OnePixel",
        "Freelancer": "John Doe",
        "state": "Completed",
        "numberOfHours": "10",
        "startDate": "12/12/2022",
        "endDate": "12/12/2019",
      },
      {
        "id": "2",
        "name": "Mobile app (blog and news)",
        "comapny": "Arvallo",
        "Freelancer": "Salah El Hamraoui",
        "state": "Completed",
        "numberOfHours": "25",
        "startDate": "16/6/2023",
        "endDate": "12/12/2019",
      },
      {
        "id": "3",
        "name": "Landing Page",
        "comapny": "Net IT",
        "Freelancer": "Tell Doe",
        "state": "Completed",
        "numberOfHours": "17",
        "startDate": "12/12/2019",
        "endDate": "12/12/2019",
      },
      {
        "id": "4",
        "name": "E-commerce website",
        "comapny": "OnePixel",
        "Freelancer": "John Doe",
        "state": "Completed",
        "numberOfHours": "10",
        "startDate": "12/12/2022",
        "endDate": "12/12/2019",
      },
      {
        "id": "5",
        "name": "Mobile app (blog and news)",
        "comapny": "Arvallo",
        "Freelancer": "Salah El Hamraoui",
        "state": "Completed",
        "numberOfHours": "25",
        "startDate": "16/6/2023",
        "endDate": "12/12/2019",
      },
      {
        "id": "6",
        "name": "Landing Page",
        "comapny": "Net IT",
        "Freelancer": "Tell Doe",
        "state": "Completed",
        "numberOfHours": "17",
        "startDate": "12/12/2019",
        "endDate": "12/12/2019",
      },
      {
        "id": "7",
        "name": "E-commerce website",
        "comapny": "OnePixel",
        "Freelancer": "John Doe",
        "state": "Completed",
        "numberOfHours": "10",
        "startDate": "12/12/2022",
        "endDate": "12/12/2019",
      },
      {
        "id": "8",
        "name": "Mobile app (blog and news)",
        "comapny": "Arvallo",
        "Freelancer": "Salah El Hamraoui",
        "state": "Completed",
        "numberOfHours": "25",
        "startDate": "16/6/2023",
        "endDate": "12/12/2019",
      },
      {
        "id": "9",
        "name": "Landing Page",
        "comapny": "Net IT",
        "Freelancer": "Tell Doe",
        "state": "Completed",
        "numberOfHours": "17",
        "startDate": "12/12/2019",
        "endDate": "12/12/2019",
      },
      {
        "id": "10",
        "name": "E-commerce website",
        "comapny": "OnePixel",
        "Freelancer": "John Doe",
        "state": "Completed",
        "numberOfHours": "10",
        "startDate": "12/12/2022",
        "endDate": "12/12/2019",
      },
      {
        "id": "11",
        "name": "Mobile app (blog and news)",
        "comapny": "Arvallo",
        "Freelancer": "Salah El Hamraoui",
        "state": "Completed",
        "numberOfHours": "25",
        "startDate": "16/6/2023",
        "endDate": "12/12/2019",
      },
      {
        "id": "12",
        "name": "Landing Page",
        "comapny": "Net IT",
        "Freelancer": "Tell Doe",
        "state": "Completed",
        "numberOfHours": "17",
        "startDate": "12/12/2019",
        "endDate": "12/12/2019",
      },
    ];
  }
);

export const removeProducts = createAsyncThunk(
  "eCommerceApp/products",
  async (productIds, { dispatch, getState }) => {
    await axios.delete("/api/ecommerce/products", { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
  name: "eCommerceApp/products",
  initialState: productsAdapter.getInitialState({
    searchText: "",
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ eCommerceApp }) =>
  eCommerceApp.products.searchText;

export default productsSlice.reducer;
