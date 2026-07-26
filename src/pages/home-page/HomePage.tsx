"use client";

import Image from "next/image";

import { useTranslation } from "react-i18next";

import LanguageSwitcher from "@/app/i18n/components/SwitchButton";

import SnakeIcon from "@/shared/assets/icons/logo_small_icon.svg";
import snakeImage from "@/shared/assets/images/hero_page_snake.png";

import styles from "./HomePage.module.css";

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      {/* for icons */}
      <SnakeIcon className={styles.arrowIcon} aria-hidden="true" />
      {/* for images */}
      <Image src={snakeImage} alt="Snake" width={200} height={200} />
      <h1>{t("title")}</h1>

      <LanguageSwitcher />
    </main>
  );
};
