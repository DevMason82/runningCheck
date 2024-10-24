"use client";

import React, {
  SetStateAction,
  useState,
  useTransition,
  useEffect,
} from "react";
// import { deleteCookie, getCookie, setCookie } from "cookies-next";
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
import { getStorage, setStorage } from "@/libs/localStorage";

const MyPosition = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Transition 적용
  const [city, setCity] = useState<string | null>(null); // 초기 값 null로 설정

  // 컴포넌트 마운트 시 쿠키에서 위치 정보 가져오기
  useEffect(() => {
    const storedCity = getStorage("myPosition");
    if (storedCity) setCity(storedCity);
  }, []);

  // 도시 변경 핸들러
  const handleCityChange = (city: SetStateAction<string>) => {
    setCity(city);
  };

  // 쿠키 설정 및 페이지 이동 핸들러
  const handleSetStorage = () => {
    if (!city) return; // 도시가 선택되지 않은 경우 처리
    startTransition(() => {
      setStorage("myPosition", city);
      router.push(`/runningStatusInfo?city=${city}`); // 페이지 이동
    });
  };

  return (
    <Card shadow="sm">
      <CardBody>
        <Select
          label="러닝을 주로 하는 지역 선택"
          labelPlacement="outside"
          id="city"
          selectedKeys={city ? [city] : []}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={isPending} // 요청 중일 때 비활성화
          disabledKeys={city ? [city] : []}
          placeholder="지역 선택"
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
          onPress={handleSetStorage}
          disabled={isPending || !city} // 로딩 중이거나 도시 선택되지 않은 경우 비활성화
        >
          {isPending ? <Spinner size="sm" /> : "확인"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyPosition;
