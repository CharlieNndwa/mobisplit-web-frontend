// pages/_app.js
import "../styles/globals.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script 
        src="FileSaver.js-master/src/FileSaver.js" 
        strategy="lazyOnload" 
      />
      <Script 
        src="jsPDF-master/dist/jspdf.debug.js" 
        strategy="lazyOnload" 
      />
      
      {/* 🧊 Fixed: Updated path pointing to the public directory asset location away from the page engine */}
      <Script 
        src="/Poppins-normal.js" 
        type="module" 
        strategy="afterInteractive" 
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;