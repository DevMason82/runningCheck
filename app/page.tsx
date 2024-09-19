import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import { SmallAreaChart } from "@/components/chartTypes";

export default function Home() {
  return (
    <main className="container mx-auto max-w-7xl p-6 flex-grow">
      <Link href="/carts">Carts</Link>

      <Link href="/products">Products</Link>
    </main>
  );
}
