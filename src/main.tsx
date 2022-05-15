import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./index.css";

import { teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: teal[500],
		},

	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider
			theme={theme}
		>
			<CssBaseline />

			<App />
		</ThemeProvider>
	</React.StrictMode>
);
