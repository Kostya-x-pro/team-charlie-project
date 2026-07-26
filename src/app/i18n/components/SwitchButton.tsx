"use client";

import { useLocale } from "../hooks/useLocale";

export default function LanguageSwitcher() {
  const { languages, switchLanguage } = useLocale();

  return (
    <div>
      {languages.map((lng) => (
        <button key={lng} onClick={() => switchLanguage(lng)}>
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
