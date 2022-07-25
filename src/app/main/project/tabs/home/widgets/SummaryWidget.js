import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { memo, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { selectWidgets } from "../../../store/widgetsSlice";

function SummaryWidget() {
  const widgets = useSelector(selectWidgets);
  const {
    data,
    ranges,
    currentRange: currentRangeDefault,
    title,
  } = widgets?.summary;

  const [currentRange, setCurrentRange] = useState(currentRangeDefault);

  function handleChangeRange(ev) {
    setCurrentRange(ev.target.value);
  }

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-8 pt-12">
        <Typography
          className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
          color="text.secondary"
        >
          {title}
        </Typography>
      </div>
      <div className="text-center mt-8">
        <Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500">
          {data.count[currentRange]}
        </Typography>
        <Typography className="text-lg font-medium text-blue-600 dark:text-blue-500">
          {data.name}
        </Typography>
      </div>
      <Typography
        className="flex items-baseline justify-center w-full mt-20 mb-24"
        color="text.secondary"
      >
        <span className="truncate">{data.extra.name}</span>:
        <b className="px-8">{data.extra.count[currentRange]}</b>
      </Typography>
    </Paper>
  );
}

export default memo(SummaryWidget);
