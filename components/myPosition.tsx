"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Select,
  SelectItem,
  SelectSection,
  Spinner,
} from "@nextui-org/react";
import { locations } from "@/config/cityLists";
import { getStorage, setStorage } from "@/libs/localStorage";
import { useBaseDateTime } from "@/hooks/useBaseDateTime";

const MyPosition = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Transition 적용
  const [selectedLocation, setSelectedLocation] = useState(null); // 초기 값 null
  const { baseDate, baseTime } = useBaseDateTime(); // 날짜 및 시간 가져오기

  // 컴포넌트 마운트 시 로컬 스토리지에서 위치 정보 가져오기
  useEffect(() => {
    const storedCity = getStorage("myPosition");

    if (storedCity) {
      try {
        const parsedArray = JSON.parse(storedCity); // JSON 파싱
        const selectedCity = parsedArray[0]; // 배열의 첫 번째 요소 접근

        if (selectedCity) {
          setSelectedLocation(selectedCity); // 매칭된 도시 설정
        } else {
          console.warn("City not found in the array");
        }
      } catch (error) {
        console.error("Failed to parse stored city array:", error);
      }
    }
  }, []);

  // 도시 선택 핸들러
  const handleCityChange = (cityName) => {
    const selectedCity = locations.find((loc) => loc.city === cityName);
    setSelectedLocation(selectedCity);
  };

  // 저장 및 페이지 이동 핸들러
  const handleSetStorage = () => {
    if (!selectedLocation) return; // 선택된 도시가 없으면 중단

    // 배열 형식으로 저장 (필요에 따라 여러 도시를 추가할 수 있음)
    const cityArray = [selectedLocation];

    startTransition(() => {
      setStorage("myPosition", JSON.stringify(cityArray)); // 배열로 저장

      const { city, krName, latitude, longitude } = selectedLocation;

      // 페이지 이동
      router.push(
        `/runningStatusInfo?city=${city}&krName=${krName}&latitude=${latitude}&longitude=${longitude}&baseDate=${baseDate}&baseTime=${baseTime}`,
      );
    });
  };

  return (
    <Card shadow="sm">
      <CardBody>
        <Select
          label="러닝을 주로 하는 지역 선택"
          labelPlacement="outside"
          id="city"
          selectedKeys={selectedLocation ? [selectedLocation.city] : []}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={isPending} // 요청 중일 때 비활성화
          placeholder="지역 선택"
          aria-label="Select city"
        >
          {/* 서울 목록 */}
          <SelectSection title="Seoul">
            {locations
              .filter((location) => location.region === "Seoul")
              .map((city) => (
                <SelectItem
                  key={city.city}
                  value={city.city}
                  className="text-default-700"
                >
                  {city.krName}
                </SelectItem>
              ))}
          </SelectSection>

          {/* 경기도 목록 */}
          <SelectSection title="Gyeonggi">
            {locations
              .filter((location) => location.region === "Gyeonggi")
              .map((city) => (
                <SelectItem
                  key={city.city}
                  value={city.city}
                  className="text-default-700"
                >
                  {city.krName}
                </SelectItem>
              ))}
          </SelectSection>
        </Select>
      </CardBody>

      <CardFooter>
        <Button
          color="success"
          fullWidth
          onPress={handleSetStorage}
          isDisabled={isPending || !selectedLocation}
        >
          {isPending ? <Spinner size="sm" /> : "확인"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyPosition;
