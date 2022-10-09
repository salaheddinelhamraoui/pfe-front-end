import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Typography from "@mui/material/Typography";

const ValidateCard = () => {
  const [imageURL, setImageURL] = useState(null);

  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () =>
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

  return (
    <div className="w-full flex flex-col items-center justify-center mt-28">
      <Typography className="text-2xl sm:text-2xl font-bold tracking-tight leading-none text-blue-500 mt-4 mb-16">
        Sign and Validate this session
      </Typography>
      <Typography className="text-base text-left tracking-tight leading-none mt-4 mb-16">
        Session title : validate Front-End UI
      </Typography>
      <Typography className="text-base text-left tracking-tight leading-none mt-4 mb-16">
        Company : Company X
      </Typography>
      <Typography className="text-base text-left tracking-tight leading-none mt-4 mb-16">
        Project : Project Y
      </Typography>
      <Typography className="text-base text-left tracking-tight leading-none mt-4 mb-16">
        Date : {new Date().toLocaleDateString()}
      </Typography>
      <SignatureCanvas
        penColor="black"
        canvasProps={{
          width: 500,
          height: 200,
          className: "sigCanvas bg-white border rounded-lg",
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
  );
};

export default ValidateCard;
