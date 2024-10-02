"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Image,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Chip,
} from "@nextui-org/react";
import { HiSearch } from "react-icons/hi";
import NextImage from "next/image";

const Search = ({ products }: { products: any }) => {
  const [values, setValues] = React.useState<Selection>(new Set([]));
  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => (
          <Chip key={value}>
            {/*{value}*/}
            {products.find((product) => `${product.id}` === `${value}`).title}
          </Chip>
        ))}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  // const [filterValue, setFilterValue] = React.useState("");
  //
  // const hasSearchFilter = Boolean(filterValue);
  //
  // const filteredItems = React.useMemo(() => {
  //   let filteredProducts = [...products];
  //
  //   if (hasSearchFilter) {
  //     filteredProducts = filteredProducts.filter((product) =>
  //       product.title.toLowerCase().includes(filterValue.toLowerCase()),
  //     );
  //   }
  //
  //   return filteredProducts;
  // }, [products, filterValue]);
  //
  // const onSearchChange = React.useCallback((value?: string) => {
  //   if (value) {
  //     setFilterValue(value);
  //   } else {
  //     setFilterValue("");
  //   }
  // }, []);
  //
  // const onClear = React.useCallback(() => {
  //   setFilterValue("");
  // }, []);

  console.log(products);

  return (
    <div>
      {/*<Input*/}
      {/*  isClearable*/}
      {/*  className="w-full mb-5"*/}
      {/*  placeholder="Search by title..."*/}
      {/*  startContent={<HiSearch size={20} />}*/}
      {/*  value={filterValue}*/}
      {/*  onClear={() => onClear()}*/}
      {/*  onValueChange={onSearchChange}*/}
      {/*/>*/}

      {/*<ListboxWrapper>*/}
      <Listbox
        topContent={topContent}
        classNames={
          {
            // base: "max-w-xs",
            // list: "max-h-[300px] overflow-scroll",
          }
        }
        // defaultSelectedKeys={["1"]}
        items={products}
        label="Assigned to"
        selectionMode="multiple"
        onSelectionChange={setValues}
        variant="flat"
      >
        {(item) => (
          <ListboxItem key={item.id} textValue={item.title}>
            <div className="flex items-start justify-between">
              {/*<Avatar*/}
              {/*  alt={item.name}*/}
              {/*  className="flex-shrink-0"*/}
              {/*  size="sm"*/}
              {/*  src={item.avatar}*/}
              {/*/>*/}
              <Image
                width={100}
                height={100}
                alt={item.title}
                // className="w-full object-cover h-full"
                src={item.thumbnail}
                as={NextImage}
              />
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <span className="text-small text-default-700">
                    {item.title}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <span className="text-tiny text-default-400">Price:</span>
                  <span className="text-tiny text-default-400">
                    {item.price}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <span className="text-tiny text-default-400">quantity:</span>
                  <span className="text-tiny text-default-400">
                    {item.quantity}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <span className="text-tiny text-default-400">total:</span>
                  <span className="text-tiny text-default-400">
                    {item.total}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <span className="text-tiny text-default-400">
                    discountPercentage:
                  </span>
                  <span className="text-tiny text-default-400">
                    {item.discountPercentage}
                  </span>
                </div>

                <div className="flex gap-2 items-center justify-end">
                  <span className="text-tiny text-default-400">
                    discountedTotal:
                  </span>
                  <span className="text-tiny text-default-400">
                    {item.discountedTotal}
                  </span>
                </div>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
      {/*</ListboxWrapper>*/}

      {/*<div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-4">*/}
      {/*  {filteredItems.map((item) => {*/}
      {/*    return (*/}
      {/*      <Card*/}
      {/*        className="w-full"*/}
      {/*        shadow="sm"*/}
      {/*        key={item.id}*/}
      {/*        isPressable*/}
      {/*        onPress={() => console.log("item pressed")}*/}
      {/*      >*/}
      {/*        <CardBody className="overflow-visible p-0">*/}
      {/*          <Image*/}
      {/*            shadow="sm"*/}
      {/*            radius="lg"*/}
      {/*            width="100%"*/}
      {/*            alt={item.title}*/}
      {/*            className="w-full object-cover h-full"*/}
      {/*            src={item.thumbnail}*/}
      {/*          />*/}
      {/*        </CardBody>*/}
      {/*        <CardFooter className="text-xs">*/}
      {/*          <div className="w-full text-right">*/}
      {/*            <p className="font-semibold">{item.title}</p>*/}
      {/*            <p className="text-default-500">{item.price}</p>*/}
      {/*          </div>*/}
      {/*        </CardFooter>*/}
      {/*      </Card>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
    </div>
  );
};

export default Search;
