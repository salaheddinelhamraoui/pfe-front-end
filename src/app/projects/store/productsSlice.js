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
        "id": "7",
        "name": "Company 1",
        "handle": "never-stop-changing-canvas-print",
        "description":
          "Excepteur commodo ipsum in ex esse elit ea id voluptate id occaecat. Sunt Lorem ipsum ut proident eu aliquip velit non minim. Sunt velit deserunt veniam eu non veniam. Eiusmod sit ex et id incididunt labore aliqua eu aute dolor cillum ex mollit mollit. Incididunt voluptate adipisicing eiusmod non ipsum cupidatat excepteur enim in pariatur eu. Labore dolor qui exercitation amet labore laboris Lorem do adipisicing. Minim non consectetur adipisicing esse ut occaecat incididunt eiusmod commodo et cillum pariatur.",
        "categories": ["Web Dev"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "7",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 58.372,
        "priceTaxIncl": 64.21,
        "taxRate": 10,
        "comparedPrice": 69.9,
        "quantity": 34,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": true,
      },
      {
        "id": "8",
        "name": "Company 2",
        "handle": "reaching-canvas-print",
        "description":
          "Velit cillum cupidatat eiusmod ea quis sit. Consequat dolore elit sunt sunt voluptate irure incididunt consectetur non. Dolore veniam ipsum anim commodo ex. Proident ipsum nostrud ullamco sit. Ad dolore nulla qui mollit laborum ex ipsum.",
        "categories": ["Mobile Dev"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "8",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 63.39,
        "priceTaxIncl": 69.73,
        "taxRate": 10,
        "comparedPrice": 79.9,
        "quantity": 4,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": false,
      },
      {
        "id": "9",
        "name": "Company 3",
        "handle": "morain-lake-canvas-print",
        "description":
          "Consequat minim velit commodo Lorem ipsum velit elit amet ut. In deserunt id duis nisi labore. Proident cillum et reprehenderit excepteur ex nulla enim.",
        "categories": ["Web Dev"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "9",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 52.154,
        "priceTaxIncl": 57.37,
        "taxRate": 10,
        "comparedPrice": 59.9,
        "quantity": 58,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": true,
      },
      {
        "id": "10",
        "name": "Company 4",
        "handle": "yosemite-canvas-print",
        "description":
          "Proident do sunt dolor tempor aliquip adipisicing dolor reprehenderit officia proident. Culpa non reprehenderit velit anim consequat velit elit eu culpa quis incididunt id. Eu incididunt exercitation nostrud est mollit officia. Laboris deserunt dolore sit occaecat exercitation quis sunt sunt nisi commodo.",
        "categories": ["Web dev"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "9",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 62.18,
        "priceTaxIncl": 68.4,
        "taxRate": 10,
        "comparedPrice": 69.9,
        "quantity": 125,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": true,
      },
      {
        "id": "11",
        "name": "Company 5",
        "handle": "a-walk-amongst-friends-canvas-print",
        "description":
          "Officia amet eiusmod eu sunt tempor voluptate laboris velit nisi amet enim proident et. Consequat laborum non eiusmod cillum eu exercitation. Qui adipisicing est fugiat eiusmod esse. Sint aliqua cupidatat pariatur mollit ad est proident reprehenderit. Eiusmod adipisicing laborum incididunt sit aliqua ullamco.",
        "categories": ["Web dev"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "1",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 9.309,
        "priceTaxIncl": 10.24,
        "taxRate": 10,
        "comparedPrice": 19.9,
        "quantity": 3,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": true,
      },
      {
        "id": "12",
        "name": "Company 6",
        "handle": "never-stop-changing-canvas-print",
        "description":
          "Excepteur commodo ipsum in ex esse elit ea id voluptate id occaecat. Sunt Lorem ipsum ut proident eu aliquip velit non minim. Sunt velit deserunt veniam eu non veniam. Eiusmod sit ex et id incididunt labore aliqua eu aute dolor cillum ex mollit mollit. Incididunt voluptate adipisicing eiusmod non ipsum cupidatat excepteur enim in pariatur eu. Labore dolor qui exercitation amet labore laboris Lorem do adipisicing. Minim non consectetur adipisicing esse ut occaecat incididunt eiusmod commodo et cillum pariatur.",
        "categories": ["Big Data"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "7",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 58.372,
        "priceTaxIncl": 64.21,
        "taxRate": 10,
        "comparedPrice": 69.9,
        "quantity": 34,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": true,
      },
      {
        "id": "13",
        "name": "Company 7",
        "handle": "morain-lake-canvas-print",
        "description":
          "Consequat minim velit commodo Lorem ipsum velit elit amet ut. In deserunt id duis nisi labore. Proident cillum et reprehenderit excepteur ex nulla enim.",
        "categories": ["AI"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "9",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 52.154,
        "priceTaxIncl": 57.37,
        "taxRate": 10,
        "comparedPrice": 59.9,
        "quantity": 58,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": true,
      },
      {
        "id": "14",
        "name": "Company 8",
        "handle": "braies-lake-canvas-print",
        "description":
          "Duis anim est non exercitation consequat. Ullamco ut ipsum dolore est elit est ea elit ad fugiat exercitation. Adipisicing eu ad sit culpa sint. Minim irure Lorem eiusmod minim nisi sit est consectetur.",
        "categories": ["Mobile Dev"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "2",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 22.381,
        "priceTaxIncl": 24.62,
        "taxRate": 10,
        "comparedPrice": 29.9,
        "quantity": 92,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": true,
      },
      {
        "id": "15",
        "name": "Company 9",
        "handle": "lago-di-braies-canvas-print",
        "description":
          "Laboris laborum minim qui reprehenderit duis fugiat ea anim labore incididunt duis. Officia adipisicing anim amet in sit aliqua fugiat quis do sint non velit eu. Labore occaecat labore elit voluptate Lorem adipisicing et ipsum id et reprehenderit ullamco. Elit in nulla laborum nulla quis dolor deserunt magna dolor ad anim magna. Esse aute reprehenderit anim sit est et quis est. Ex reprehenderit culpa deserunt qui sint eiusmod reprehenderit ipsum consequat ut.",
        "categories": ["Mobile Dev"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "5",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 9.309,
        "priceTaxIncl": 10.24,
        "taxRate": 10,
        "comparedPrice": 19.9,
        "quantity": 19,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": true,
      },
      {
        "id": "16",
        "name": "Company 10",
        "handle": "fall-glow-canvas-print",
        "description":
          "Sit ipsum esse eu consequat veniam sit consectetur consectetur anim. Ut Lorem dolor ullamco do. Laboris excepteur consectetur tempor nisi commodo amet deserunt duis.",
        "categories": ["Big Data"],
        "tags": ["canvas-print", "nature"],
        "featuredImageId": "3",
        "images": [
          {
            "id": "0",
            "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg",
            "type": "image",
          },
          {
            "id": "1",
            "url": "assets/images/apps/ecommerce/braies-lake.jpg",
            "type": "image",
          },
          {
            "id": "2",
            "url": "assets/images/apps/ecommerce/fall-glow.jpg",
            "type": "image",
          },
          {
            "id": "3",
            "url": "assets/images/apps/ecommerce/first-snow.jpg",
            "type": "image",
          },
          {
            "id": "4",
            "url": "assets/images/apps/ecommerce/lago-di-braies.jpg",
            "type": "image",
          },
          {
            "id": "5",
            "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg",
            "type": "image",
          },
          {
            "id": "6",
            "url": "assets/images/apps/ecommerce/never-stop-changing.jpg",
            "type": "image",
          },
          {
            "id": "7",
            "url": "assets/images/apps/ecommerce/reaching.jpg",
            "type": "image",
          },
          {
            "id": "8",
            "url": "assets/images/apps/ecommerce/morain-lake.jpg",
            "type": "image",
          },
          {
            "id": "9",
            "url": "assets/images/apps/ecommerce/yosemite.jpg",
            "type": "image",
          },
        ],
        "priceTaxExcl": 44.809,
        "priceTaxIncl": 49.29,
        "taxRate": 10,
        "comparedPrice": 59.9,
        "quantity": 60,
        "sku": "A445BV",
        "width": "22cm",
        "height": "24cm",
        "depth": "15cm",
        "weight": "3kg",
        "extraShippingFee": 3,
        "active": true,
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
