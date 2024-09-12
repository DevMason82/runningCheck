"use client";
import React, { Suspense, useEffect, useState, useTransition } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Select,
  SelectItem,
  Spinner,
  Image,
  Link,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { getUserCart } from "@/app/carts/actions";

const UserIdSelect = ({ data }: { data: any }) => {
  const [value, setValue] = useState<string>("33");
  const [cartData, setCartData] = useState<any>(data);
  const [isPending, startTransition] = useTransition();

  const handleSelectionChange = (key: React.SetStateAction<string>) => {
    console.log("KEY", key);
    setValue(key);
    startTransition(() => getUserCart(key).then((data) => setCartData(data)));
  };

  return (
    <div>
      {isPending && (
        <Spinner
          size="lg"
          className="absolute inset-0 flex items-center justify-center z-50"
          color="success"
        />
      )}

      <Tabs
        variant="underlined"
        aria-label="Tabs variants"
        className="mb-3"
        selectedKey={value}
        onSelectionChange={handleSelectionChange}
      >
        <Tab key="142" title="142" />
        <Tab key="33" title="33" />
        <Tab key="108" title="108" />
      </Tabs>

      {cartData && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cartData.carts[0].products.map((cart) => {
            return (
              <Card key={cart.id}>
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={cart.thumbnail}
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{cart.title}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-row justify-end">
                  <dl className="w-2/5 gap-3">
                    <dt className="float-left mr-1">Price</dt>
                    <dd className="text-right">{cart.price}</dd>
                    <dt className="float-left mr-1">Quantity</dt>
                    <dd className="text-right">{cart.quantity}</dd>
                  </dl>
                </CardBody>
                <Divider />
                <CardFooter className="justify-end">
                  <div>Total: {cart.total}</div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserIdSelect;
