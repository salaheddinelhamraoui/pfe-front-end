import { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import Moment from 'react-moment';
import { Link, useSearchParams } from 'react-router-dom';

const ValidateCard = () => {
  const [imageURL, setImageURL] = useState(null);
  const [sessions, setSessions] = useState();
  const [sessionData, setSessionData] = useState();
  const user = useSelector(selectUser);
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/findSessionByUserId/${user._id}`)
      .then((res) => {
        setSessions(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/findSession/${searchParams.get('sessionId')}`)
      .then((res) => {
        setSessionData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParams.get('sessionId')]);

  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () => setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));

  return (
    <div className="flex flex-column w-full">
      <div className="bg-white h-[75vh] w-[28rem] overflow-scroll">
        <h3 className="text-center border-b p-24 pb-8">Passed Sessions</h3>
        <div className="mt-2">
          {sessions?.map((session, index) => (
            <div className="border-b mt-4 px-24 py-8 " key={index}>
              <Link to={`/validate-session-company?sessionId=${session._id}`} className='custom-link'>{session.title}</Link>
              <div>
                <Moment format="YYYY/MM/DD hh:mm">{session.date}</Moment>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-28">
        <Typography className="text-2xl sm:text-2xl font-bold tracking-tight leading-none text-blue-500 mt-4 mb-16 ">
          Sign and Validate this session
        </Typography>
        <Typography className="text-base text-left tracking-tight leading-none mt-4 mb-16">
          Session title : {sessionData?.title}
        </Typography>

        <Typography className="text-base text-left tracking-tight leading-none mt-4 mb-16">
          Project : {sessionData?.project_id?.project_name}
        </Typography>
        <Typography className="text-base text-left tracking-tight leading-none mt-4 mb-16">
          Date : <Moment format="YYYY/MM/DD hh:mm">{sessionData?.date}</Moment>
        </Typography>
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: 'sigCanvas bg-white border rounded-lg',
          }}
          ref={sigCanvas}
        />
        <div className="flex mt-12">
          <Button
            className="px-4 min-w-128 mr-12"
            color="success"
            variant="contained"
            endIcon={
              <FuseSvgIcon className="" size={20}>
                heroicons-solid:check
              </FuseSvgIcon>
            }
            onClick={save}
          >
            Validate
          </Button>
          <Button
            className="px-8 min-w-128"
            color="error"
            variant="contained"
            endIcon={
              <FuseSvgIcon className="" size={20}>
                heroicons-solid:trash
              </FuseSvgIcon>
            }
            onClick={clear}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ValidateCard;
