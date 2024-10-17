export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Running Check",
  description: "",
  navItems: [
    {
      label: "홈",
      href: "/",
    },
    {
      label: "검색",
      href: "/search",
    },
    {
      label: "패키지(Card)",
      href: "/pack",
    },
    {
      label: "패키지(Table)",
      href: "/packTable",
    },
    {
      label: "My",
      href: "/my",
    },
  ],
  navMenuItems: [
    {
      label: "홈",
      href: "/",
    },
    {
      label: "검색",
      href: "/search",
    },
    {
      label: "패키지(Card)",
      href: "/pack",
    },
    {
      label: "패키지(Table)",
      href: "/packTable",
    },
    // {
    //   label: "My",
    //   href: "/my",
    // },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
