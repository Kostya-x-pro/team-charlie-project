import type { Metadata } from "next";
import I18nProvider from "@/shared/providers/i18n/I18nProvider";

import { isValidLocale } from "../../shared/lib/i18n";
import { defaultLang } from "../../shared/config/i18n";

import "@/app/styles/globals.css";

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
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = isValidLocale(rawLang) ? rawLang : defaultLang;

  return (
    <html lang={lang}>
      <body>
        <I18nProvider lang={lang}>{children}</I18nProvider>
      </body>
    </html>
  );
}
