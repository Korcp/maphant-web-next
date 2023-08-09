import { Inter } from "next/font/google";
import Image from "next/image";

import adv1 from "@/app/img/adv1.jpg";
import adv2 from "@/app/img/adv2.png";

import styles from "./layout.module.css";
import MainHeader from "./MainPage/Header/MainHeader";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={styles.html}>
      <body className={inter.className}>
        <div className={styles.layout}>
          <MainHeader />

          <main className={styles.mainLayout}>
            <div className={styles.emptybox} />
            <div className={styles.flexbox1}>
              <Image src={adv1}></Image>
            </div>

            <div className={styles.content}>{children}</div>

            <div className={styles.flexbox2}>
              <Image src={adv2}></Image>
            </div>
            <div className={styles.emptybox} />
          </main>

          <footer className={styles.footer}>Footer</footer>
        </div>
      </body>
    </html>
  );
}
