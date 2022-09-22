import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FuseLoading from "@fuse/core/FuseLoading";
import { CardActionArea } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import axios from "axios";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UpdateSession from "../sessions/UpdateSession";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TimeLine = () => {
  const [data, setData] = useState();
  const [loadingState, setLoadingState] = useState(false);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState();
  const [sessionsTime, setSessionsTime] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setLoadingState(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/findSessionByProjectId/${id}`)
      .then((res) => {
        setData(res.data.result);
        setLoadingState(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingState(false);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/restHours/${id}`)
      .then((res) => {
        setSessionsTime(res.data);
        setLoadingState(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingState(false);
      });
  }, []);

  const handleSelectedSessionId = (state) => {
    setSelectedSessionId(state);
  };

  return (
    <div className="w-full px-24 w-full mt-20">
      <Paper className="relative shadow rounded-2xl overflow-hidden p-24">
        {loadingState && <FuseLoading />}
        {!loadingState && data && data.length === 0 && (
          <p className="text-center mt-8">No Sessions Found</p>
        )}
        <div className="absolute top-16 left-16">
          <p>Total Sessions Time : {sessionsTime && sessionsTime.totalSessionsTime.toFixed(2)}h</p>
          <p className="mt-4">
            Remaining Time: {sessionsTime && sessionsTime.consumedTime.toFixed(2)}h
          </p>
        </div>
        <Timeline position="alternate">
          {data &&
            data.map((item, index) => (
              <TimelineItem key={item._id}>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  <Moment format="YYYY/MM/DD hh:mm">{item.date}</Moment> -{" "}
                  <Moment format="YYYY/MM/DD hh:mm">{item.end_date}</Moment>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary" sx={{ py: "7px", px: "12px" }}>
                    {index + 1}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Card
                    sx={{ maxWidth: 345 }}
                    className={`${index % 2 !== 0 && "ml-auto"}`}
                  >
                    <CardActionArea className="cursor-default">
                      <CardContent>
                        <div className="flex">
                          <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                          </Typography>
                          <FuseSvgIcon
                            size={20}
                            color="action"
                            className="inline ml-auto cursor-pointer"
                            onClick={() => {
                              setSelectedSessionId(item._id);
                              handleOpen();
                            }}
                          >
                            heroicons-solid:pencil-alt
                          </FuseSvgIcon>
                        </div>

                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="mt-12"
                        >
                          State :{" "}
                          <span className="inline text-12 font-semibold py-4 px-8 rounded-full truncate bg-green-500 text-white">
                            Signed
                          </span>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <UpdateSession
                  selectedSessionId={selectedSessionId}
                  handleSelectedForUpdate={handleSelectedSessionId}
                  handleClose={handleClose}
                />
              </Box>
            </Modal>
          </div>
        </Timeline>
      </Paper>
    </div>
  );
};

export default TimeLine;
