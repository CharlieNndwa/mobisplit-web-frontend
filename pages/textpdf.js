import React from "react";
import ReactDOM from "react-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import Invoice from "./Invoice";

class App extends React.Component {
  componentDidMount() {
    window.html2canvas = html2canvas;
    var doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      // format: [4, 2]
    });

    var content = document.getElementById("content-22");
    doc.html(content, {
      callback: function (doc) {
        console.log("in callback");
        doc.save();
      },
    });
  }
  render() {
    const styles = {
      container: {
        backgroundColor: "white",
      },
      nameContainer: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
        borderBottom: "1px solid black",
      },
      firstName: { fontWeight: "600", fontSize: "1.6rem" },
      lastName: { fontWeight: "400", fontSize: "1.6rem" },
      line: {
        border: "1px solid black",
        backgroundColor: "black",
        marginTop: "1rem",
      },
    };

    return (
      <div className="App content-22" id="content-22">
        {/* <Invoice /> */}

        <div style={{ padding: "1rem" }}>
          <div style={styles.container}>
            <div style={styles.nameContainer}>
              <h2 style={styles.firstName}>Sonia</h2>{" "}
              <h2 style={styles.lastName}>Uduma</h2>
            </div>

            <p style={{ fontWeight: "300" }}>Product Developer Associate</p>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
