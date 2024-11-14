"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
} from "@nextui-org/react";
import { MdOutlineRefresh } from "react-icons/md";
import { fetchCoupangRecommendations } from "@/app/actions";
import HvCenterSpinner from "@/components/hvCenterSpinner";

const ProductCard = ({ data, recoNum }: { data: any; recoNum: number }) => {
  const [recoData, setRecoData] = useState(data);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   startTransition(async () => {
  //     try {
  //       setLoading(true);
  //       // Server Action 호출하여 추천 상품 가져오기
  //       const fetchedProducts = await fetchCoupangRecommendations();
  //       setRecoData(fetchedProducts);
  //     } catch (error) {
  //       console.error("Error loading products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // if (loading || isPending)
  //   return <p className="text-default-700">Loading recommended products...</p>;

  const handleRefresh = () => {
    startTransition(() => {
      fetchCoupangRecommendations().then((res) => setRecoData(res));
    });
  };

  return (
    <div>
      {isPending && <HvCenterSpinner />}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-end">
          <p className="text-xs text-default-400 text-center w-fit">
            &#34;쿠팡 파트너스 활동으로, 일정액의 수수료를 제공받습니다.&#34;
          </p>
          <Button
            isIconOnly
            variant="light"
            onPress={handleRefresh}
            aria-label="새로고침"
            size="sm"
          >
            <MdOutlineRefresh size={20} />
          </Button>
        </div>

        <Card
          // className="max-w-md"
          isPressable
          onPress={() => window.open(recoData[recoNum].productUrl, "_blank")}
        >
          <CardHeader className="flex text-sm font-semibold items-start gap-1">
            {recoData[recoNum].productName}
          </CardHeader>
          <Divider />
          <CardBody className="relative">
            <div className="flex flex-row items-center justify-center">
              <Image
                src={recoData[recoNum].productImage}
                alt={recoData[recoNum].productName}
                width={180}
              />
            </div>
          </CardBody>
          <CardFooter className="gap-2 flex justify-between">
            {recoData[recoNum].isRocket && (
              <Chip color="primary" size="sm">
                로켓배송
              </Chip>
            )}
            <Chip size="sm">
              {recoData[recoNum].productPrice.toLocaleString()}원
            </Chip>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProductCard;
