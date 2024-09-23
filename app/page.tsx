import { getCart } from "@/app/actions";
import CartCard from "@/components/cartCard";
import { Button, Link } from "@nextui-org/react";

export default async function Home() {
  return (
    <main className="container mx-auto max-w-7xl p-6 flex-grow">
      {/*<Link href="/carts">Carts</Link>*/}
      <Button href="/carts" as={Link} color="primary" variant="solid" size="sm">
        Go to Carts
      </Button>
    </main>
  );
}
