import { Skeleton } from "@nextui-org/react";
import DeviceDetector from "@/components/deviceDetector";

import dynamic from "next/dynamic";

const LazyWeather = dynamic(() => import("@/components/weather"), {
  loading: () => <Skeleton className="rounded-lg" />,
});

const LazyEA = dynamic(() => import("@/components/ea"), {
  loading: () => <Skeleton className="rounded-lg" />,
});

export default async function Home() {
  return (
    <div className="grid grid-flow-row auto-rows-max gap-4 md:grid-cols-2 xl:grid-cols-4">
      <DeviceDetector />

      <LazyWeather />

      <LazyEA />
    </div>
  );
}
