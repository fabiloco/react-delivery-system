import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import "./index.css";

import { teal } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

const theme = createTheme({
	palette: {
		primary: {
			main: teal[500],
		},
		mode: "dark"
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<SnackbarProvider maxSnack={3}>
			<ThemeProvider
				theme={theme}
			>
				<CssBaseline />

				<App />
			</ThemeProvider>
		</SnackbarProvider>
	</React.StrictMode>
);
