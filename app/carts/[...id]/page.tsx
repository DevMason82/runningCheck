import { Button, Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import DeleteBtn from "@/app/carts/[...id]/components/deleteBtn";
import { HiSearch } from "react-icons/hi";
import Search from "@/app/carts/[...id]/components/search";
import BackBtn from "@/components/backBtn";

export default async function Page({
  params: { id },
}: {
  params: { id: number };
}) {
  let res = await fetch(`https://dummyjson.com/carts/${id}`);
  let cartData = await res.json();
  // console.log("CART DATA ==>>", cartData);

  const {
    products,
    total,
    discountedTotal,
    userId,
    totalProducts,
    totalQuantity,
  } = cartData;

  return (
    <main className="text-default-500 p-6">
      <h1 className="text-default-500 text-lg font-semibold">
        UserId[{userId}] Cart Info
      </h1>

      <Divider className="my-3" />

      <Search products={products} />

      <Divider className="my-5" />

      <div className={"flex justify-center align-middle space-x-2"}>
        <BackBtn />
        <Link
          href={{
            pathname: "/cartModify",
            query: { id: id },
          }}
        >
          <Button color="secondary" size="sm">
            Modify
          </Button>
        </Link>

        <DeleteBtn id={id} />
      </div>
    </main>
  );
}
