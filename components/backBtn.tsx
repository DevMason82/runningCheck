"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { FiChevronLeft } from "react-icons/fi";

const BackBtn = () => {
  const router = useRouter();
  return (
    <Button
      isIconOnly
      color="primary"
      size="sm"
      variant="light"
      onPress={() => router.back()}
    >
      <FiChevronLeft size={20} />
    </Button>
  );
};

export default BackBtn;
