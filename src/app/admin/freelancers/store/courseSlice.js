import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showMessage } from "app/store/fuse/messageSlice";

export const getCourse = createAsyncThunk(
  "freelancerApp/course/getCourse",
  async (courseId) => {
    const response = await axios.get(`/api/academy/courses/${courseId}`);

    const data = await response.data;

    return data;
  }
);

export const updateCourse = createAsyncThunk(
  "freelancerApp/course/updateCourse",
  async (_data, { getState, dispatch }) => {
    const { id } = getState().freelancerApp.course;

    const response = await axios.put(`/api/academy/courses/${id}`, _data);

    const data = await response.data;

    dispatch(showMessage({ message: "Course Saved" }));

    return data;
  }
);

const courseSlice = createSlice({
  name: "freelancerApp/course",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getCourse.fulfilled]: (state, action) => action.payload,
    [updateCourse.fulfilled]: (state, action) => action.payload,
  },
});

export const selectCourse = ({ freelancerApp }) => freelancerApp.course;

export default courseSlice.reducer;
