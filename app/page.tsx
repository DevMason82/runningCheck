// import { Skeleton } from "@nextui-org/react";
// import DeviceDetector from "@/components/deviceDetector";
//
// import dynamic from "next/dynamic";
// import { getWeather } from "@/app/actions";
// import LocationTracker from "@/components/locationTracker";
// import Weather from "@/components/weather";
//
// const LazyWeather = dynamic(() => import("@/components/weather"), {
//   loading: () => <Skeleton className="rounded-lg" />,
//   ssr: false,
// });

import MyPosition from "@/components/myPosition";
import LocationTracker from "@/components/locationTracker";

export default async function Home() {
  // const data = await getWeather("Uijeongbu-si");
  // console.log("GET WEATHER INFO ==>>", data);

  return (
    <div className="max-w">
      <MyPosition />
      {/*<div className="grid grid-flow-row auto-rows-max gap-4 md:grid-cols-2 xl:grid-cols-4">*/}
      {/*<DeviceDetector />*/}

      {/*<LazyWeather data={data} />*/}
      {/*<LazyWeather />*/}
    </div>
  );
}
