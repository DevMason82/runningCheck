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
  SelectSection,
  Spinner,
} from "@nextui-org/react";
import { cities, locations } from "@/config/cityLists";
import { getStorage, setStorage } from "@/libs/localStorage";
import LocationTracker from "@/components/locationTracker";
import { useWatchPosition } from "@/hooks/useWatchPosition";
import { useLatLonToGrid } from "@/hooks/useLatLonToGrid";
import { useBaseDateTime } from "@/hooks/useBaseDateTime";
import { latLonToGrid } from "@/libs/latLonToGrid";

const MyPosition = () => {
  // const router = useRouter();
  // const [isPending, startTransition] = useTransition(); // Transition 적용
  // const [city, setCity] = useState<string | null>(null); // 초기 값 null로 설정
  // const { location, error } = useWatchPosition();
  // const { x, y } = useLatLonToGrid(location.lat, location.lon);
  // const { baseDate, baseTime } = useBaseDateTime();

  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Transition 적용
  const [selectedLocation, setSelectedLocation] = useState([]); // 초기 값 null
  const { baseDate, baseTime } = useBaseDateTime(); // 날짜 및 시간 가져오기

  // 컴포넌트 마운트 시 로컬 스토리지에서 위치 정보 가져오기
  // useEffect(() => {
  //   // const storedCity = getStorage("myPosition");
  //   // console.log("Stored City:", storedCity);
  //   //
  //   // if (storedCity) {
  //   //   try {
  //   //     console.log(locations.find((loc) => loc.city === storedCity));
  //   //     const cityData = locations.find((loc) => loc.city === storedCity);
  //   //     console.log("City:", cityData);
  //   //     if (cityData) {
  //   //       setSelectedLocation(cityData); // 해당 도시가 있으면 설정
  //   //     }
  //   //   } catch (error) {
  //   //     console.error("Failed to parse stored city:", error);
  //   //   }
  //   // }
  //
  //   // const storedCity = getStorage("myPosition");
  //   // console.log("Stored City:", storedCity);
  //   // if (storedCity) setSelectedLocation(storedCity);
  // }, []);

  useEffect(() => {
    const storedCity = getStorage("myPosition");

    if (storedCity) {
      try {
        const parsedArray = JSON.parse(storedCity); // JSON 파싱
        const selectedCity = parsedArray[0]; // 배열의 첫 번째 요소 접근

        console.log("Selected City from Array:", selectedCity);

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
    console.log("selectedCity", selectedCity);
    setSelectedLocation(selectedCity);
  };

  // 저장 및 페이지 이동 핸들러
  // const handleSetStorage = () => {
  //   if (!selectedLocation) return; // 도시가 선택되지 않은 경우 처리
  //
  //   const { city, krName, latitude, longitude } = selectedLocation;
  //   const { x, y } = latLonToGrid(latitude, longitude);
  //
  //   startTransition(() => {
  //     // 로컬 스토리지에 선택한 위치 저장
  //     setStorage("myPosition", JSON.stringify(city));
  //
  //     // 쿼리스트링에 필요한 정보 전달하며 페이지 이동
  //     router.push(
  //       `/runningStatusInfo?city=${city}&krName=${krName}&nx=${x}&ny=${y}&baseDate=${baseDate}&baseTime=${baseTime}`,
  //     );
  //   });
  // };

  // const handleSetStorage = () => {
  //   if (!selectedLocation) return; // 선택된 도시가 없으면 중단
  //
  //   startTransition(() => {
  //     // 객체 전체를 JSON 형식으로 저장
  //     setStorage("myPosition", JSON.stringify(selectedLocation));
  //
  //     const { city, krName, latitude, longitude } = selectedLocation;
  //     const { x, y } = latLonToGrid(latitude, longitude);
  //
  //     // 페이지 이동
  //     router.push(
  //       `/runningStatusInfo?city=${city}&krName=${krName}&nx=${x}&ny=${y}&baseDate=${baseDate}&baseTime=${baseTime}`,
  //     );
  //   });
  // };

  const handleSetStorage = () => {
    if (!selectedLocation) return; // 선택된 도시가 없으면 중단

    // 배열 형식으로 저장 (필요에 따라 여러 도시를 추가할 수 있음)
    const cityArray = [selectedLocation];

    startTransition(() => {
      setStorage("myPosition", JSON.stringify(cityArray)); // 배열로 저장

      const { city, krName, latitude, longitude } = selectedLocation;
      // const { x, y } = latLonToGrid(latitude, longitude);

      // 페이지 이동
      router.push(
        `/runningStatusInfo?city=${city}&krName=${krName}&latitude=${latitude}&longitude=${longitude}`,
      );
    });
  };

  // 컴포넌트 마운트 시 쿠키에서 위치 정보 가져오기
  // useEffect(() => {
  //   const storedCity = getStorage("myPosition");
  //   if (storedCity) setCity(storedCity);
  // }, []);

  // 도시 변경 핸들러
  // const handleCityChange = (city: SetStateAction<string>) => {
  //   setCity(city);
  // };

  // 쿠키 설정 및 페이지 이동 핸들러
  // const handleSetStorage = () => {
  //   if (!city) return; // 도시가 선택되지 않은 경우 처리
  //   startTransition(() => {
  //     setStorage("myPosition", city);
  //     router.push(
  //       `/runningStatusInfo?city=${city}&nx=${x}&ny=${y}&baseDate=${baseDate}&baseTime=${baseTime}`,
  //     ); // 페이지 이동
  //   });
  // };

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
          disabledKeys={selectedLocation ? [selectedLocation.city] : []}
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
          disabled={isPending || !selectedLocation} // 로딩 중이거나 선택되지 않은 경우 비활성화
        >
          {isPending ? <Spinner size="sm" /> : "확인"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyPosition;
