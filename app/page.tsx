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
    <main className="">
      <Link href="/carts">Carts</Link>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">NextUI</p>
              <p className="text-small text-default-500">nextui.org</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div style={{ width: 150, height: 65 }}>
              <SmallAreaChart />
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit source code on GitHub.
            </Link>
          </CardFooter>
        </Card>

        {/*<Card>*/}
        {/*  <CardHeader className="flex gap-3">*/}
        {/*    <Image*/}
        {/*      alt="nextui logo"*/}
        {/*      height={40}*/}
        {/*      radius="sm"*/}
        {/*      src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"*/}
        {/*      width={40}*/}
        {/*    />*/}
        {/*    <div className="flex flex-col">*/}
        {/*      <p className="text-md">NextUI</p>*/}
        {/*      <p className="text-small text-default-500">nextui.org</p>*/}
        {/*    </div>*/}
        {/*  </CardHeader>*/}
        {/*  <Divider />*/}
        {/*  <CardBody>*/}
        {/*    <p>Make beautiful websites regardless of your design experience.</p>*/}
        {/*  </CardBody>*/}
        {/*  <Divider />*/}
        {/*  <CardFooter>*/}
        {/*    <Link*/}
        {/*      isExternal*/}
        {/*      showAnchorIcon*/}
        {/*      href="https://github.com/nextui-org/nextui"*/}
        {/*    >*/}
        {/*      Visit source code on GitHub.*/}
        {/*    </Link>*/}
        {/*  </CardFooter>*/}
        {/*</Card>*/}

        {/*<Card>*/}
        {/*  <CardHeader className="flex gap-3">*/}
        {/*    <Image*/}
        {/*      alt="nextui logo"*/}
        {/*      height={40}*/}
        {/*      radius="sm"*/}
        {/*      src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"*/}
        {/*      width={40}*/}
        {/*    />*/}
        {/*    <div className="flex flex-col">*/}
        {/*      <p className="text-md">NextUI</p>*/}
        {/*      <p className="text-small text-default-500">nextui.org</p>*/}
        {/*    </div>*/}
        {/*  </CardHeader>*/}
        {/*  <Divider />*/}
        {/*  <CardBody>*/}
        {/*    <p>Make beautiful websites regardless of your design experience.</p>*/}
        {/*  </CardBody>*/}
        {/*  <Divider />*/}
        {/*  <CardFooter>*/}
        {/*    <Link*/}
        {/*      isExternal*/}
        {/*      showAnchorIcon*/}
        {/*      href="https://github.com/nextui-org/nextui"*/}
        {/*    >*/}
        {/*      Visit source code on GitHub.*/}
        {/*    </Link>*/}
        {/*  </CardFooter>*/}
        {/*</Card>*/}

        {/*<Card>*/}
        {/*  <CardHeader className="flex gap-3">*/}
        {/*    <Image*/}
        {/*      alt="nextui logo"*/}
        {/*      height={40}*/}
        {/*      radius="sm"*/}
        {/*      src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"*/}
        {/*      width={40}*/}
        {/*    />*/}
        {/*    <div className="flex flex-col">*/}
        {/*      <p className="text-md">NextUI</p>*/}
        {/*      <p className="text-small text-default-500">nextui.org</p>*/}
        {/*    </div>*/}
        {/*  </CardHeader>*/}
        {/*  <Divider />*/}
        {/*  <CardBody>*/}
        {/*    <p>Make beautiful websites regardless of your design experience.</p>*/}
        {/*  </CardBody>*/}
        {/*  <Divider />*/}
        {/*  <CardFooter>*/}
        {/*    <Link*/}
        {/*      isExternal*/}
        {/*      showAnchorIcon*/}
        {/*      href="https://github.com/nextui-org/nextui"*/}
        {/*    >*/}
        {/*      Visit source code on GitHub.*/}
        {/*    </Link>*/}
        {/*  </CardFooter>*/}
        {/*</Card>*/}

        {/*<Card>*/}
        {/*  <CardHeader className="flex gap-3">*/}
        {/*    <Image*/}
        {/*      alt="nextui logo"*/}
        {/*      height={40}*/}
        {/*      radius="sm"*/}
        {/*      src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"*/}
        {/*      width={40}*/}
        {/*    />*/}
        {/*    <div className="flex flex-col">*/}
        {/*      <p className="text-md">NextUI</p>*/}
        {/*      <p className="text-small text-default-500">nextui.org</p>*/}
        {/*    </div>*/}
        {/*  </CardHeader>*/}
        {/*  <Divider />*/}
        {/*  <CardBody>*/}
        {/*    <p>Make beautiful websites regardless of your design experience.</p>*/}
        {/*  </CardBody>*/}
        {/*  <Divider />*/}
        {/*  <CardFooter>*/}
        {/*    <Link*/}
        {/*      isExternal*/}
        {/*      showAnchorIcon*/}
        {/*      href="https://github.com/nextui-org/nextui"*/}
        {/*    >*/}
        {/*      Visit source code on GitHub.*/}
        {/*    </Link>*/}
        {/*  </CardFooter>*/}
        {/*</Card>*/}
      </div>
    </main>
  );
}
