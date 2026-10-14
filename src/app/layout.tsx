import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ProSider — Play something awesome", template: "%s | ProSider" },
  description: "Jump into quick, colorful browser games on ProSider. No downloads, just play.",
  applicationName: "ProSider",
  keywords: ["browser games", "arcade", "puzzle games", "ProSider"],
  openGraph: { title: "ProSider — Play something awesome", description: "Your next favorite game is one click away.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0a0d18", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
