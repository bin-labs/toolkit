import { useEffect } from "react";
import "./App.css";
import { AppContextProvider } from "./context/app";
import { Root } from "./routes";
import { invoke } from "@tauri-apps/api/core";

function App() {
  return (
    <AppContextProvider>
      <Root />
    </AppContextProvider>
  );
}

export default App;
