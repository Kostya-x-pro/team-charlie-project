import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "@/app/i18n";
import I18nProvider from "@/app/i18n/components/I18nProvider";

import "@/app/styles/globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Team Charlie Project",
    template: "%s | Team Charlie Project",
  },
  description: "Team Charlie web application",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={geist.variable}>
        <I18nProvider lang={lang}>{children}</I18nProvider>
      </body>
    </html>
  );
}
