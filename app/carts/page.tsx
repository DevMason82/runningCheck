import UserIdSelect from "@/app/carts/UserIdSelect";
import { getUserCart } from "@/app/carts/actions";
import React from "react";
import BackBtn from "@/components/backBtn";

export default async function Page() {
  const data = await getUserCart(33);
  return (
    <main className="container mx-auto p-6 flex-grow">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg text-default-500 font-semibold mb-3">
          Carts List
        </h3>
        <BackBtn />
      </div>
      <UserIdSelect data={data} />
    </main>
  );
}
