"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import { IoMdSearch } from "react-icons/io";
import CartCard from "@/components/cartCard";

const CartsDataLists = ({ data }: { data: any }) => {
  console.log("DATA ==>>", data);

  const [filterValue, setFilterValue] = React.useState("");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredDatas = [...data];

    if (hasSearchFilter) {
      // 각 item의 products 배열에서 title을 필터링
      filteredDatas = filteredDatas
        .map((item) => ({
          ...item,
          products: item.products.filter((product) =>
            product.title.toLowerCase().includes(filterValue.toLowerCase()),
          ),
        }))
        // 제품이 없는 카트는 필터링
        .filter((item) => item.products.length > 0);
    }

    return filteredDatas;
  }, [data, filterValue]);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  return (
    <div className="text-default-500">
      <div className="mb-5">
        <Input
          isClearable
          className="w-full"
          placeholder="제품명으로 검색"
          startContent={<IoMdSearch size={24} className="text-default-500" />}
          style={{ height: 52, borderColor: "#ced4da" }}
          value={filterValue}
          variant="bordered"
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {filteredItems.map((item: any, index: number) => {
          return <CartCard key={item.id} item={item} index={index} />;
        })}
      </div>
    </div>
  );
};

export default CartsDataLists;
