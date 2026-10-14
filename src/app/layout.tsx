import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ProSider — The Arcade Library", template: "%s | ProSider" },
  description: "Discover classic PC ports, arcade favourites, Neo Geo fighters and Flash-era games in the ProSider library.",
  applicationName: "ProSider",
  keywords: ["ProSider", "classic games", "browser games", "arcade", "Flash games", "WebAssembly"],
  openGraph: { title: "ProSider — The Arcade Library", description: "Classic games. Modern browser.", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0c0d10", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
