import React, { useEffect } from "react";
import styles from "./preloader.module.css";
import preloaderAnimation from "animations/preloader";

function Preloader() {
  useEffect(() => {
    preloaderAnimation();
  }, []);

  return (
    <>
      <div
        className={`${styles.overlap} ${styles.left} bg-slate-100 preloader_left`}
      />
      <div
        className={`${styles.overlap} ${styles.right} bg-slate-100 preloader_right`}
      />
    </>
  );
}

export default Preloader;
