import { Skeleton } from "@nextui-org/react";
import DeviceDetector from "@/components/deviceDetector";

import dynamic from "next/dynamic";
import { getWeather, getWeather2 } from "@/app/actions";
import LocationTracker from "@/components/locationTracker";
import Weather from "@/components/weather";
import {
  setCookie,
  getCookie,
  getCookies,
  deleteCookie,
  hasCookie,
} from "cookies-next";
import { cookies } from "next/headers";
import { getStorage } from "@/libs/localStorage";

const LazyWeather = dynamic(() => import("@/components/weather"), {
  loading: () => <Skeleton className="rounded-lg" />,
});

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const cityName = searchParams.city;
  console.log("CITY NAME ==>>", cityName);

  const getCity = getCookies({ cookies });
  const { myPosition } = getCity;
  const ddd = getStorage("myPosition");
  console.log("My position DDD5555 ==>>", ddd);
  const data = await getWeather(cityName);
  // const data2 = await getWeather2();
  // console.log(data);
  return (
    <div className="container mx-auto max-w-lg">
      {/*<div className="grid grid-flow-row auto-rows-max gap-4 md:grid-cols-2 xl:grid-cols-4">*/}
      {/*<DeviceDetector />*/}

      {/*<LocationTracker />*/}

      <LazyWeather data={data} />
    </div>
  );
}
