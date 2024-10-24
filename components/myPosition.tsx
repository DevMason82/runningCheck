"use client";

import React, {
  SetStateAction,
  useState,
  useTransition,
  useEffect,
} from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
// import { useRouter } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { cities } from "@/config/cityLists";

const MyPosition = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Transition 적용
  const [city, setCity] = useState<string | null>(null); // 초기 값 null로 설정

  // 컴포넌트 마운트 시 쿠키에서 위치 정보 가져오기
  useEffect(() => {
    const savedPosition = getCookie("myPosition") as string | null;
    if (savedPosition) setCity(savedPosition);
  }, []);

  // 도시 변경 핸들러
  const handleCityChange = (city: SetStateAction<string>) => {
    setCity(city);
  };

  // 쿠키 설정 및 페이지 이동 핸들러
  const handleSetCookie = () => {
    if (!city) return; // 도시가 선택되지 않은 경우 처리
    startTransition(() => {
      deleteCookie("myPosition"); // 기존 쿠키 삭제
      setCookie("myPosition", city); // 새로운 위치 설정
      router.push("/runningStatusInfo"); // 페이지 이동
    });
  };

  return (
    <Card shadow="sm">
      <CardBody>
        <Select
          labelPlacement="outside-left"
          id="city"
          selectedKeys={city ? [city] : []}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={isPending} // 요청 중일 때 비활성화
          disabledKeys={[city]}
          placeholder="Select a city"
          aria-label="Select city"
        >
          {cities.map((city) => (
            <SelectItem
              key={city.name}
              value={city.name}
              className="text-default-700"
            >
              {city.krName}
            </SelectItem>
          ))}
        </Select>
      </CardBody>

      <CardFooter>
        <Button
          color="success"
          fullWidth
          onPress={handleSetCookie}
          disabled={isPending || !city} // 로딩 중이거나 도시 선택되지 않은 경우 비활성화
        >
          {isPending ? <Spinner size="sm" /> : "위치 선택"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyPosition;
