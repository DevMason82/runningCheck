"use client";
import React from "react";
import { Card, CardBody, CardHeader, Chip, Image } from "@nextui-org/react";
import { useRouter } from "next-nprogress-bar";

const CartCard = ({ item, index }: { item: any; index: number }) => {
  const {
    id,
    userId,
    products,
    total,
    totalProducts,
    discountedTotal,
    totalQuantity,
  } = item;
  const router = useRouter();
  const handleRouter = () => {
    router.push(`/carts/${id}`);
  };
  return (
    <Card
      key={id}
      isPressable
      onPress={handleRouter}
      shadow="none"
      classNames={{ base: ["border-1"] }}
    >
      <CardHeader className="flex gap-3 justify-between">
        <p className="text-md">UserId: {userId}</p>
        <Chip size="sm" color="success">
          {totalProducts}EA
        </Chip>
      </CardHeader>
      <CardBody className="">
        <div className="grid grid-cols-4 gap-4">
          {products.map((item) => (
            <Card className="w-fit" shadow="sm" key={item.id}>
              <CardHeader className="absolute p-2">
                <h4 className="text-default-500 font-medium text-xs truncate">
                  {item.title}
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0"
                src={item.thumbnail}
              />
            </Card>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default CartCard;
