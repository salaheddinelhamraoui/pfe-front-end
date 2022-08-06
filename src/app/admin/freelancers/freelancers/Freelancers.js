import _ from "@lodash";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import FusePageSimple from "@fuse/core/FusePageSimple";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { selectCategories } from "../store/categoriesSlice";
import { getCourses, selectCourses } from "../store/coursesSlice";
import FreelancerCard from "./FreelancerCard";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function Freelancers(props) {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const categories = useSelector(selectCategories);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  // const theme = useTheme();
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hideCompleted, setHideCompleted] = useState(false);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    function getFilteredArray() {
      if (
        searchText.length === 0 &&
        selectedCategory === "all" &&
        !hideCompleted
      ) {
        return courses;
      }

      return _.filter(courses, (item) => {
        if (selectedCategory !== "all" && item.category !== selectedCategory) {
          return false;
        }

        if (hideCompleted && item.progress.completed > 0) {
          return false;
        }

        return item.title.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    if (courses) {
      setFilteredData(getFilteredArray());
    }
  }, [courses, hideCompleted, searchText, selectedCategory]);

  function handleSelectedCategory(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }
  return (
    <FusePageSimple
      content={
        <div className="w-full flex flex-col flex-1  mx-auto px-24 pt-24 sm:p-40">
          <div className="w-full flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
              <FormControl className="flex w-full sm:w-136" variant="outlined">
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  label="Category"
                  value={selectedCategory}
                  onChange={handleSelectedCategory}
                >
                  <MenuItem value="all">
                    <em> All </em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem value={category.slug} key={category.id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Search for a course"
                placeholder="Enter a keyword..."
                className="flex w-full sm:w-256 mx-8"
                value={searchText}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={handleSearchText}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className="ml-auto">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                >
                  <Button
                    className=""
                    variant="contained"
                    color="secondary"
                    startIcon={
                      <FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>
                    }
                    onClick={() => {}}
                  >
                    Add
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            };

            const item = {
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            };

            return (
              filteredData &&
              (filteredData.length > 0 ? (
                <motion.div
                  className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredData.map((freelancer) => {
                    return (
                      <motion.div variants={item} key={freelancer.id}>
                        <FreelancerCard freelancer={freelancer} />
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <Typography color="text.secondary" className="text-24 my-24">
                    No courses found!
                  </Typography>
                </div>
              ))
            );
          }, [filteredData])}
        </div>
      }
      scroll={isMobile ? "normal" : "page"}
    />
  );
}

export default Freelancers;
