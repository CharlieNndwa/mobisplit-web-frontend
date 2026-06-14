import dynamic from "next/dynamic";
import Head from "next/head";

const [HomeView] = [dynamic(() => import("container/Home"))];

export default function Home() {
  return (
    <>
      <Head>
        <title>Mobisplit </title>
        <meta name="description" content="Get behind the wheel and get paid" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <HomeView />
    </>
  );
}
