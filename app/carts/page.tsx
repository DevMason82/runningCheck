import UserIdSelect from "@/app/carts/UserIdSelect";
import { getCart, getUserCart } from "@/app/carts/actions";
import React from "react";
import BackBtn from "@/components/backBtn";
import CartCard from "@/components/cartCard";

export default async function Page() {
  const data = await getCart();
  const { carts } = data;
  // const data = await getUserCart(33);
  return (
    <main className="container mx-auto max-w-7xl p-6 flex-grow">
      <div className="flex flex-row justify-between">
        <h3 className="text-lg text-default-500 font-semibold mb-3">
          Carts List
        </h3>
        <BackBtn />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {carts.map((item: any, index: number) => {
          return <CartCard key={item.id} item={item} index={index} />;
        })}
      </div>
    </main>
    // <main className="container mx-auto p-6 flex-grow">
    //   <div className="flex flex-row justify-between">
    //     <h3 className="text-lg text-default-500 font-semibold mb-3">
    //       Carts List
    //     </h3>
    //     <BackBtn />
    //   </div>
    //   <UserIdSelect data={data} />
    // </main>
  );
}
