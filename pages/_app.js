// pages/_app.js
import "../styles/globals.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* 🧊 Fixed: Modified injection strategies to lazy-load resource-intensive files, stopping navigation freezing */}
      <Script 
        src="FileSaver.js-master/src/FileSaver.js" 
        strategy="lazyOnload" 
      />
      <Script 
        src="jsPDF-master/dist/jspdf.debug.js" 
        strategy="lazyOnload" 
      />
      <Script 
        src="./Poppins-normal.js" 
        type="module" 
        strategy="afterInteractive" 
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;