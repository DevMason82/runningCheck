"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

const UpdateBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button color="secondary" size="sm" type="submit" isLoading={pending}>
      Modify
    </Button>
  );
};

export default UpdateBtn;
