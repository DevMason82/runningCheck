import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import DeleteBtn from "@/app/carts/[...id]/components/deleteBtn";

export default async function Page({
  params: { id },
}: {
  params: { id: number };
}) {
  // console.log("ID VALUE ==>>", id);
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
    <>
      <dl className={"text-amber-50"}>
        <dt>ID</dt>
        <dd>{id}</dd>
        <dt>Total</dt>
        <dd>{total}</dd>
        <dt>UserId</dt>
        <dd>{userId}</dd>
        <dt>TotalProducts</dt>
        <dd>{totalProducts}</dd>
        <dt>TotalQuantity</dt>
        <dd>{totalQuantity}</dd>
      </dl>

      <Divider />

      <div className={"text-amber-50"}>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <p>ID: {product.id}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          );
        })}
      </div>

      <div className={"flex justify-center align-middle space-x-2"}>
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
    </>
  );
}
