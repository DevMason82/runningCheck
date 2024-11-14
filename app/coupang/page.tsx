import { fetchCoupangRecommendations } from "@/app/actions";
import ProductCard from "@/app/coupang/components/productCard";

export default async function Page() {
  const data = await fetchCoupangRecommendations();
  console.log("RECO ==>>", data);
  return <ProductCard data={data} />;
}
