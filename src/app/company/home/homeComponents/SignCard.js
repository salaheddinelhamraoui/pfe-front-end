import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import moment from "moment";
import Moment from "react-moment";

function SignCard({ session }) {
  const [readyToSign, setReadyToSign] = useState(false);

  useEffect(() => {
    let expirationDate = moment(session.date);
    var localTime = moment().format("YYYY-MM-DD hh:mm"); // store localTime
    let diff = expirationDate.local().diff(localTime, "minutes");

    console.log("diff", diff);
    console.log("proposedDate", localTime);

    if (diff < 15) {
      setReadyToSign(true);
    }
  }, []);

  console.log("start date", session.date);
  console.log("end date", session.end_date);

  return (
    <div
      className="flex border rounded-lg  px-12 py-8 mx-12 mb-8"
      key={session._id}
    >
      <div className="flex items-center justify-between  w-[80%]">
        <Typography className="text-base font-medium  dark:text-blue-500 mt-4">
          {session.title}
        </Typography>

        <Typography className="text-base font-medium  dark:text-blue-500 mt-4 mr-8">
          <Moment format="hh:mm">{session.date}</Moment>
        </Typography>
        <Typography className="text-base font-medium  dark:text-blue-500 mt-4 mr-[3rem]">
          <Moment format="hh:mm">{session.end_date}</Moment>
        </Typography>
      </div>
      <div className="ml-auto">
        <Button
          to={`/validate-session-company?sessionId=${session._id}`}
          component={Link}
          className="px-12 min-w-128"
          color="error"
          variant="contained"
          endIcon={
            <FuseSvgIcon className="" size={20}>
              heroicons-solid:arrow-sm-right
            </FuseSvgIcon>
          }
          disabled={!readyToSign}
        >
          Sign
        </Button>
      </div>
    </div>
  );
}

export default SignCard;
