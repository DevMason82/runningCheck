import DataTable from "@/app/products/components/dataTable";

export default async function Page() {
  const data = await fetch("https://dummyjson.com/products?limit=0");
  const products = await data.json();

  return (
    <main className="container mx-auto p-6 flex-grow">
      <DataTable data={products} />
    </main>
  );
}
