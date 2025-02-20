import React from "react";
import { ToastContainer } from "react-toastify"; // https://fkhadra.github.io/react-toastify/introduction/
import { Navigation } from "./routes";
import { AuthProvider } from "./context";
import { Box, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  layerStyles: {
    base: {
      bg: "gray.50",
      border: "2px solid",
      borderColor: "gray.500",
    },
    selected: {
      bg: "teal.500",
      color: "teal.700",
      borderColor: "orange.500",
    },
  },
});

function App({ isSelected }) {
  const layerStyle = isSelected ? "selected" : "base";
  return (
    <Box layerStyle={layerStyle}>
      <AuthProvider>
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
      </AuthProvider>
    </Box>
  );
}

export default App;
