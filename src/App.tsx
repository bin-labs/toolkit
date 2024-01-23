import "./App.css";
import { AppContextProvider } from "./context/app";
import { Root } from "./routes";

function App() {
  return (
    <AppContextProvider>
      <Root />
    </AppContextProvider>
  );
}

export default App;
