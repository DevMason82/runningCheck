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

  // if (!mounted) {
  //   return null; // 마운트되기 전에는 아무것도 렌더링하지 않음
  // }

  // const toggleColor = theme.theme === "dark" ? "white" : "black";

  const handleMyPosition = () => {
    deleteCookie("myPosition");
    // setCookie("myPosition", "");
    router.push("/");
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
        <NavbarBrand>
          <Link href="/" color="foreground">
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item}-${index}`}
            isActive={pathname === item.href}
          >
            <Link
              color={"foreground"}
              href={item.href}
              // onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>

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
            >
              <DropdownSection title="User Info" showDivider>
                <DropdownItem
                  key="profile"
                  className=""
                  textValue={session?.user?.name!}
                >
                  <p className="font-semibold">{session?.user?.name!}</p>
                </DropdownItem>
              </DropdownSection>

              <DropdownItem
                key="myPosition"
                // color="danger"
                onPress={handleMyPosition}
                className="text-right"
              >
                위치변경
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                onPress={() => signOut()}
                className="text-right"
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
