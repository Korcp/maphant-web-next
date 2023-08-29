import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import adv1 from "@/app/img/adv1.jpg";
import adv2 from "@/app/img/adv2.png";
import logo_kr from "./MainPage/img/icon3.png";
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
            <div className={styles.adBox1}>
              <div className={styles.adv}>
                <Image src={adv1} alt="" fill></Image>
              </div>
            </div>

            <div className={styles.content}>{children}</div>

            <div className={styles.adBox2}>
              <div className={styles.adv}>
                <Image src={adv2} alt="" fill></Image>
              </div>
            </div>
            <div className={styles.emptybox} />
          </main>

          <footer className={styles.footer}>
            <div>
            <Link href="/Main/MainPage" className={styles.icon}>
              <Image src={logo_kr} alt="" width={80} height={80} />
            과끼리
            </Link></div>
            <div style={{fontSize:"1rem" ,color:"white"}}><p>대표명 : 박현수, 윤진수 , 오영석</p>
                  상호명 : 과끼리
            </div>
            <div style={{fontSize:"1.5rem", color:"white"}}>
              <div>sponser by</div>경성대학교 소프트웨어학과</div>
            
          </footer>
        </div>
      </body>
    </html>
  );
}
