"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Divider,
} from "@nextui-org/react";
// import { ThemeSwitcher } from "@/components/themeSwitcher";
import { ThemeSwitch } from "@/components/theme-switch";
import { useTheme } from "next-themes";
import { useSession, signOut, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next-nprogress-bar";
import { BiCurrentLocation } from "react-icons/bi";
import { PiSignOut } from "react-icons/pi";
import { FaPersonRunning } from "react-icons/fa6";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [mounted, setMounted] = useState(true);
  // const theme = useTheme();
  const { data: session } = useSession();

  const pathname = usePathname();
  const router = useRouter();

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const menuItems = [
    // {
    //   label: "Home",
    //   href: "/",
    // },
    // {
    //   label: "Carts",
    //   href: "/carts",
    // },
    // {
    //   label: "Products",
    //   href: "/products",
    // },
  ];

  const handleMyPosition = () => {
    router.push("/");
  };

  const handleIntro = () => {
    window.open("https://blog.naver.com/mason-life/223650492066", "_blank");
  };

  const handleFeedback = () => {
    window.open("https://blog.naver.com/mason-life/223651915694", "_blank");
  };

  return (
    <NextUINavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      isBordered
    >
      <NavbarContent>
        {/*<NavbarMenuToggle*/}
        {/*  aria-label={isMenuOpen ? "Close menu" : "Open menu"}*/}
        {/*  className="sm:hidden bg-background"*/}
        {/*/>*/}
        <NavbarBrand className="text-default-800">
          {/*<Link href="/" color="foreground">*/}
          <p className="font-bold text-inherit">{siteConfig.name}</p>
          {/*</Link>*/}
        </NavbarBrand>
      </NavbarContent>

      {/*<NavbarContent className="hidden sm:flex gap-6" justify="center">*/}
      {/*  {menuItems.map((item, index) => (*/}
      {/*    <NavbarItem*/}
      {/*      key={`${item}-${index}`}*/}
      {/*      isActive={pathname === item.href}*/}
      {/*    >*/}
      {/*      <Link*/}
      {/*        color={"foreground"}*/}
      {/*        href={item.href}*/}
      {/*        // onPress={() => setIsMenuOpen(false)}*/}
      {/*      >*/}
      {/*        {item.label}*/}
      {/*      </Link>*/}
      {/*    </NavbarItem>*/}
      {/*  ))}*/}
      {/*</NavbarContent>*/}
      <NavbarContent justify="end">
        {session && session.user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="success"
                name={session?.user?.name!}
                size="sm"
                src={session?.user?.image!}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="text-default-700"
              disabledKeys={["profile"]}
            >
              <DropdownSection title="User Info" showDivider>
                <DropdownItem
                  key="profile"
                  className=""
                  textValue={session?.user?.name!}
                >
                  {/*<p className="font-semibold text-white">*/}
                  {session?.user?.name!}
                  {/*</p>*/}
                </DropdownItem>
              </DropdownSection>

              <DropdownItem
                key="intro"
                // color="danger"
                onPress={handleIntro}
                // className="text-right flex flex-row bg-yellow-500"
                startContent={<FaPersonRunning size={18} />}
                textValue="러닝체크 소개"
                // href="https://blog.naver.com/mason-life/223650492066"
              >
                소개
              </DropdownItem>

              <DropdownItem key="themeSwitch" textValue="테마변경">
                <ThemeSwitch />
              </DropdownItem>

              <DropdownItem
                key="myPosition"
                // color="danger"
                onPress={handleMyPosition}
                // className="text-right flex flex-row bg-yellow-500"
                startContent={<BiCurrentLocation size={18} />}
                textValue="위치변경"
              >
                위치변경
              </DropdownItem>

              <DropdownItem
                key="feedback"
                // color="danger"
                onPress={handleFeedback}
                // className="text-right flex flex-row bg-yellow-500"
                startContent={<FaPersonRunning size={18} />}
                textValue="러닝체크 소개"
                // href="https://blog.naver.com/mason-life/223650492066"
              >
                피드백/개선사항
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                onPress={() => signOut()}
                // className="text-right"
                startContent={<PiSignOut size={18} />}
                textValue="signOut"
              >
                SignOut
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link href="/signin">SignIn</Link>
        )}
        {/*<NavbarItem className="hidden lg:flex">*/}
        {/*  {session && session.user ? (*/}
        {/*    <Button variant="light" onPress={() => signOut()}>*/}
        {/*      {session?.user.name}님*/}
        {/*    </Button>*/}
        {/*  ) : (*/}
        {/*    <Link href="#">Login</Link>*/}
        {/*  )}*/}
        {/*</NavbarItem>*/}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              // className="w-full"
              href={item.href}
              size="lg"
              // onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};
