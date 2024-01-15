import React from "react";
import {createRoot} from "react-dom/client";
import "@/style.css";
import usei18n from "./core/i18n";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

usei18n()

root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);
