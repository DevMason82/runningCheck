import { Button, Link } from "@nextui-org/react";

export default async function Home() {
  const [productsResponse, cartsResponse] = await Promise.all([
    fetch("https://dummyjson.com/products?limit=0"),
    fetch("https://dummyjson.com/carts?limit=0"),
  ]);

  const productsData = await productsResponse.json();
  const cartsData = await cartsResponse.json();

  return (
    <section>
      <Button
        href="/products"
        as={Link}
        color="primary"
        variant="solid"
        size="sm"
      >
        Go to Products {productsData.products.length}
      </Button>

      <Button href="/carts" as={Link} color="primary" variant="solid" size="sm">
        Go to Carts {cartsData.carts.length}
      </Button>
    </section>
  );
}
