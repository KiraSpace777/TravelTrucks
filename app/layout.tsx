import React from "react";
import { Inter, Manrope } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import { TanStackProvider } from "../components/Providers/TanStackProvider";
import { NavigationHeader } from "../components/NavigationHeader/NavigationHeader";

const interFontConfiguration = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-family",
  display: "swap",
});

const manropeFontConfiguration = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--second-family",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://travel-trucks-one-blond.vercel.app/",
  ),
  title: "Campers Rental",
  description: "Find your ideal camper van or truck for traveling",
  icons: {
    icon: "/caravan-camping.svg",
    apple: "/caravan-camping.svg",
  },
  openGraph: {
    title: "TravelTrucks - Campers Rental",
    description: "Find your ideal camper van or truck for traveling",
    url: "https://travel-trucks-one-blond.vercel.app/",
    siteName: "TravelTrucks",
    images: [
      {
        url: "/image/Hero.jpg",
        width: 1200,
        height: 630,
        alt: "TravelTrucks - Find your ideal camper van",
      },
    ],
    type: "website",
  },
};

interface RootLayoutProperties {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProperties) => {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${interFontConfiguration.variable} ${manropeFontConfiguration.variable}`}>
        <TanStackProvider>
          <NavigationHeader />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
