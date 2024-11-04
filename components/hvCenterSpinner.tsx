import React from "react";
import { Spinner } from "@nextui-org/react";

const HvCenterSpinner = () => {
  return (
    <Spinner
      className="absolute inset-0 flex items-center justify-center z-50"
      color="success"
      size="lg"
    />
  );
};

export default HvCenterSpinner;
