"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { FiChevronLeft } from "react-icons/fi";

const BackBtn2 = () => {
  const router = useRouter();
  return (
    <Button
      color="primary"
      size="sm"
      variant="light"
      onPress={() => router.back()}
    >
      <FiChevronLeft size={20} /> Back
    </Button>
  );
};

export default BackBtn2;
