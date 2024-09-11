"use client";
import React from "react";
import { deleteCart } from "@/app/carts/[...id]/actions";
import { Button } from "@nextui-org/react";

const DeleteBtn = ({ id }: { id: number }) => {
  const handleDelete = deleteCart.bind(null, id);
  return (
    <form action={handleDelete}>
      <Button color="danger" size="sm" type="submit">
        Delete
      </Button>
    </form>
  );
};

export default DeleteBtn;
