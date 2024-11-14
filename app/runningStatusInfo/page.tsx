import { Divider, Skeleton } from "@nextui-org/react";

import dynamic from "next/dynamic";
import { fetchCoupangRecommendations, getWeather2 } from "@/app/actions";
import ProductCard from "@/components/productCard";

const LazyWeather = dynamic(() => import("@/components/weather"), {
  loading: () => <Skeleton className="rounded-lg" />,
});

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const cityName = searchParams.city;
  const { city, latitude, longitude } = searchParams;
  // console.log("CITY NAME ==>>", cityName);
  // const data = await getWeather(city);
  const data = await getWeather2(latitude, longitude);
  // console.log("Weather DATA ==>>", data);
  const coupagngRecoData = await fetchCoupangRecommendations();
  return (
    <div className="max-w">
      <LazyWeather data={data} />
      <Divider className="my-5" />
      <ProductCard data={coupagngRecoData} recoNum={1} />
    </div>
  );
}
