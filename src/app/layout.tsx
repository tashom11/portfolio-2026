import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Sans } from "next/font/google";
import PageTransition from "@/components/PageTransition/PageTransition";
import { profile } from "@/data/profile";
import { getSiteUrl } from "@/utils/environment";
import "@/styles/main.scss";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: `${profile.name} | ${profile.role}`, template: `%s | ${profile.name}` },
  description:
    `Portfolio de ${profile.name}, ${profile.role} avec ${profile.yearsExperience} ans d’expérience.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: "Interfaces utiles, rapides et soigneusement construites.",
    url: "/",
    siteName: `Portfolio de ${profile.name}`,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: "Interfaces utiles, rapides et soigneusement construites.",
  },
  icons: { icon: "/icon.svg" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f2f0e9",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${instrumentSans.variable} ${dmMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
