import React from "react";
import { ToastContainer } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import { Navigation } from "./routes";

function App() {
  return (
    <div>
      <Navigation />

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
