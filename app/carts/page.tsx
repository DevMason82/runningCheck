import UserIdSelect from "@/app/carts/UserIdSelect";
import { getCart, getUserCart } from "@/app/carts/actions";
import React from "react";
import BackBtn from "@/components/backBtn";
import CartCard from "@/components/cartCard";
import { IoMdSearch } from "react-icons/io";
import { Input } from "@nextui-org/react";
import CartsDataLists from "@/app/carts/components/cartsDataLists";

export default async function Page() {
  const data = await getCart();
  const { carts } = data;

  return (
    <section>
      <div className="flex flex-row justify-between">
        <h3 className="text-lg text-default-500 font-semibold mb-3">
          Carts List
        </h3>
        <BackBtn />
      </div>

      <CartsDataLists data={carts} />

      {/*<div className="mb-5">*/}
      {/*  <Input*/}
      {/*    isClearable*/}
      {/*    className="w-full"*/}
      {/*    placeholder="Search by title..."*/}
      {/*    startContent={<IoMdSearch size={24} />}*/}
      {/*    // variant="bordered"*/}
      {/*    // value={filterValue}*/}
      {/*    // onClear={() => onClear()}*/}
      {/*    // onValueChange={onSearchChange}*/}
      {/*  />*/}
      {/*</div>*/}

      {/*<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">*/}
      {/*  {carts.map((item: any, index: number) => {*/}
      {/*    return <CartCard key={item.id} item={item} index={index} />;*/}
      {/*  })}*/}
      {/*</div>*/}

      {/*<UserIdSelect data={carts} />*/}
    </section>
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
