import DataTable from "@/app/products/components/dataTable";

export default async function Page() {
  const data = await fetch("https://dummyjson.com/products?limit=0");
  const products = await data.json();

  return (
    <section>
      <DataTable data={products} />
    </section>
  );
}
