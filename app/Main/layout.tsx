import { Inter } from "next/font/google";
import MainHeader from "./MainPage/Header/MainHeader";
import styles from "./layout.module.css";

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
            <div className={styles.flexbox1}>광고창</div>

            <div className={styles.content}>{children}</div>

            <div className={styles.flexbox2}>광고창</div>
            <div className={styles.emptybox} />
          </main>

          <footer className={styles.footer}>Footer</footer>
        </div>
      </body>
    </html>
  );
}
