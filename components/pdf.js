import jsPDF from "jspdf";
import React, { useRef } from "react";
import { font } from "./font";
import "./Lato-normal";

const ContentTemplate = () => {
  const styles = {
    container: {
      backgroundColor: "white",
      padding: "20px",
      maxWidth: "600px",
      fontSize: "12px",
      fontFamily: "Inter",
    },
    line: {
      border: "1px solid black",
      backgroundColor: "black",
      margin: "1rem 0rem",
    },
  };

  const certificateTemplateRef = useRef();

  const handleGeneratePdf = () => {
    const doc = new jsPDF("p", "pt", "a4");

    doc.html(document.querySelector("#content"), {
      callback: function (pdf) {
        pdf.setFont("Poppins");
        pdf.save("test");
      },
    });
  };

  return (
    <>
      <div ref={certificateTemplateRef} id="template" style={{ width: "100%" }}>
        <div style={styles.container} id="content">
          <p style={{ fontWeight: "700", fontSize: "20px" }}>
            Bacon ipsum dolor amet chuck short ribs turkey chicken, shankle
            spare ribs strip steak ribeye salami. Leberkas beef pancetta,
            turducken chuck shoulder filet mignon fatback rump prosciutto
            ribeye. Meatloaf chuck flank drumstick, shoulder venison landjaeger
            boudin pork chop bresaola beef ribs turducken shank. Doner buffalo
            corned beef, flank chuck shank pork loin turkey swine. Frankfurter
            biltong pork brisket tri-tip, meatball hamburger turducken
            prosciutto doner salami meatloaf swine boudin.
          </p>

          <hr style={styles.line} />

          <p>
            Bacon ipsum dolor amet chuck short ribs turkey chicken, shankle
            spare ribs strip steak ribeye salami. Leberkas beef pancetta,
            turducken chuck shoulder filet mignon fatback rump prosciutto
            ribeye. Meatloaf chuck flank drumstick, shoulder venison landjaeger
            boudin pork chop bresaola beef ribs turducken shank. Doner buffalo
            corned beef, flank chuck shank pork loin turkey swine. Frankfurter
            biltong pork brisket tri-tip, meatball hamburger turducken
            prosciutto doner salami meatloaf swine boudin.
          </p>
        </div>
      </div>

      <button
        style={{
          margin: "50px",
          padding: "10px",
          backgroundColor: "black",
          color: "white",
          fontFamily: "Anton",
          fontSize: "1.2rem",
          textTransform: "uppercase",
          letterSpacing: "0.1rem",
          cursor: "pointer",
          width: "200px",
        }}
        onClick={handleGeneratePdf}
      >
        Generate Pdf
      </button>
    </>
  );
};

export default ContentTemplate;
