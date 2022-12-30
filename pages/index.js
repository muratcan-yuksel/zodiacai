import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ZodiacSign from "../components/ZodiacSign";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zodiac AI</title>
        <meta
          name="description"
          content="Zodiac AI- World's first AI powered horoscope teller"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>
      <div class="d-flex flex-wrap bd-highlight mb-3">
        <div class="p-2 bd-highlight">
          {" "}
          <ZodiacSign image="leo" /> 1
        </div>
        <div class="p-2 bd-highlight">
          {" "}
          <ZodiacSign image="leo" /> 1
        </div>
        <div class="p-2 bd-highlight">
          {" "}
          <ZodiacSign image="leo" /> 1
        </div>
      </div>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
