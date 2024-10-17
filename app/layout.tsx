import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";
// import { isMobileDevice } from "@/libs/responsive";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
