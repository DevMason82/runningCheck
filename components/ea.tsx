import { Card, CardBody, CardHeader, Chip, Divider } from "@nextui-org/react";

export default async function Ea() {
  const [productsResponse, cartsResponse] = await Promise.all([
    fetch("https://dummyjson.com/products?limit=0"),
    fetch("https://dummyjson.com/carts?limit=0"),
  ]);

  const productsData = await productsResponse.json();
  const cartsData = await cartsResponse.json();
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

// export default Ea;
