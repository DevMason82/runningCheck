import { Skeleton } from "@nextui-org/react";
import DeviceDetector from "@/components/deviceDetector";

import dynamic from "next/dynamic";
import { getWeather } from "@/app/actions";
import LocationTracker from "@/components/locationTracker";

const LazyWeather = dynamic(() => import("@/components/weather"), {
  loading: () => <Skeleton className="rounded-lg" />,
});

// const LazyEA = dynamic(() => import("@/components/ea"), {
//   loading: () => <Skeleton className="rounded-lg" />,
// });

export default async function Home() {
  const data = await getWeather("seoul");
  console.log("GET WEATHER INFO ==>>", data);
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
  //   next: { revalidate: 10 }, // 10초마다 데이터를 다시 가져옴 (ISR)
  // });
  //
  // console.log("Fetching data from server at:", new Date().toLocaleString());
  //
  // const data = await res.json();

  return (
    <div className="grid grid-flow-row auto-rows-max gap-4 md:grid-cols-2 xl:grid-cols-4">
      <DeviceDetector />

      <LocationTracker />

      <LazyWeather data={data} />

      {/*<LazyEA />*/}

      {/*<p>Last fetch time: {new Date().toLocaleString()}</p>*/}
    </div>
  );
}
