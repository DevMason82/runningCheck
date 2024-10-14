import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";

export default async function Ea() {
  const [productsResponse, cartsResponse] = await Promise.all([
    fetch("https://dummyjson.com/products?limit=0", {
      next: { revalidate: 10 },
    }),
    fetch("https://dummyjson.com/carts?limit=0", {
      next: { revalidate: 10 },
    }),
  ]);

  const productsData = await productsResponse.json();
  console.log("PRODUCTS DATA ==>>", productsData);
  const cartsData = await cartsResponse.json();
  console.log("PRODUCTS DATA ==>>", productsData);
  return (
    <Card>
      <CardHeader>EA</CardHeader>
      <Divider />
      <CardBody>
        <ul>
          <li className="flex items-center justify-between mb-3">
            <span>Carts:</span>
            <Chip size="sm">{cartsData.carts.length} EA</Chip>
          </li>
          <li className="flex items-center justify-between">
            <span>Products:</span>
            <Chip size="sm">{productsData.products.length} EA</Chip>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
