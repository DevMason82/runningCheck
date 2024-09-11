"use client";
import React from "react";
import { useFormState } from "react-dom";
import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { updateCart } from "@/app/carts/[...id]/actions";
import UpdateBtn from "@/app/cartModify/components/updateBtn";
import BackBtn from "@/app/cartModify/components/backBtn";

const UpDateForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const initialState = {
    cartId: id,
    mason: "musong.choi",
  };

  const [state, formAction] = useFormState(updateCart, initialState);

  const getErrorMessage = (field: string) => {
    if (
      !state?.success &&
      state?.message?.toLowerCase().includes(field.toLowerCase())
    ) {
      const fieldErrorPattern = new RegExp(`\\b${field}\\b`, "i");
      if (fieldErrorPattern.test(state?.message)) {
        return state?.message;
      }
    }
    return null;
  };

  return (
    <div className="p-6 rounded-2xl flex flex-col space-y-2 justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
      <h1 className="text-xl">Product Info Update</h1>
      <form
        action={formAction}
        title="Product Info Update"
        className="space-y-3"
      >
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            isRequired
            label="ID"
            name="id"
            fullWidth
            size="sm"
            className="max-w-sm"
            isInvalid={!!getErrorMessage("id")}
            errorMessage={getErrorMessage("id")}
          />
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            isRequired
            label="Quantity"
            name="quantity"
            fullWidth
            size="sm"
            className="max-w-sm"
            isInvalid={!!getErrorMessage("quantity")}
            errorMessage={getErrorMessage("quantity")}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <BackBtn />
          <UpdateBtn />
        </div>

        {/* Display error or success messages */}
        {state?.success && state?.message && (
          <div className="mt-4 text-green-500">{state.message}</div>
        )}
      </form>
    </div>
  );
};

export default UpDateForm;
