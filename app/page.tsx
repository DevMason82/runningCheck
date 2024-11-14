import MyPosition from "@/components/myPosition";
import { fetchCoupangRecommendations } from "@/app/actions";
import ProductCard from "@/components/productCard";
import { Divider } from "@nextui-org/react";

export default async function Home() {
  const data = await fetchCoupangRecommendations();

  return (
    <div className="max-w grid grid-rows-1">
      <div className="flex items-start justify-center">
        <MyPosition />
      </div>

      <Divider className="my-5" />

      <div className="flex items-end justify-center">
        <ProductCard data={data} />
      </div>
    </div>
    // <div className="max-w bg-yellow-500 h-screen">
    //   <div className="grid grid-rows-2 grid-flow-col gap-4 bg-green-400">
    //     <div className="row-end-1">
    //       <MyPosition />
    //     </div>
    //     {/*<Divider className="my-3" />*/}
    //     <div className="row-end-2">
    //       <ProductCard data={data} />
    //     </div>
    //   </div>
    // </div>
  );
}
