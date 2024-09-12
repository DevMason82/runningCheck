"use client";
import React from "react";
import { Card, CardBody, CardFooter, Input, Image } from "@nextui-org/react";
import { HiSearch } from "react-icons/hi";

const Search = ({ products }: { products: any }) => {
  const [filterValue, setFilterValue] = React.useState("");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredProducts;
  }, [products, filterValue]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  return (
    <div>
      <Input
        isClearable
        className="w-full mb-5"
        placeholder="Search by title..."
        startContent={<HiSearch size={20} />}
        value={filterValue}
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredItems.map((item) => {
          return (
            <Card
              className="w-full"
              shadow="sm"
              key={item.id}
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.title}
                  className="w-full object-cover h-full"
                  src={item.thumbnail}
                />
              </CardBody>
              <CardFooter className="text-xs">
                <div className="w-full text-right">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-default-500">{item.price}</p>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
