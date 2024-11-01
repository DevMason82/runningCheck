import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  // openGraph: {
  //   title: "기본 사이트 이름",
  //   description: "이 사이트의 기본 Open Graph 설명입니다.",
  //   url: "https://yourwebsite.com",
  //   images: [
  //     {
  //       url: "https://yourwebsite.com/images/default-og-image.png",
  //       width: 800,
  //       height: 600,
  //       alt: "기본 Open Graph 이미지",
  //     },
  //   ],
  //   siteName: "사이트 이름",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "기본 사이트 이름",
  //   description: "기본 Twitter 카드 설명입니다.",
  //   images: ["https://yourwebsite.com/images/default-twitter-image.png"],
  // },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const mobile = await isMobileDevice();
  // console.log("Mobile ==>>", mobile);

  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="container mx-auto max-w-7xl p-6 flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
