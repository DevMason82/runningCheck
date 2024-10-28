import { Skeleton } from "@nextui-org/react";

import dynamic from "next/dynamic";
import { getUltraSrtNcst, getWeather, getWeather2 } from "@/app/actions";

const LazyWeather = dynamic(() => import("@/components/weather"), {
  loading: () => <Skeleton className="rounded-lg" />,
});

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const cityName = searchParams.city;
  const { city, nx, ny, baseDate, baseTime } = searchParams;
  console.log("CITY NAME ==>>", cityName);
  const data = await getWeather(city);
  const kmaData = await getUltraSrtNcst(nx, ny, baseDate, baseTime);
  console.log("kmaData ==>>", kmaData);
  return (
    <div className="container mx-auto max-w-lg">
      <LazyWeather data={data} />
    </div>
  );
}
