import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import {
	Navbar,
	AppDrawer
} from "../ui";

const drawerWidth = 240;

export const Layout = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

	return(
		<>
			<Navbar
				isDrawerOpen={isDrawerOpen}
				setIsDrawerOpen={setIsDrawerOpen}
			/>
			<AppDrawer
				isDrawerOpen={isDrawerOpen}
				drawerWidth={drawerWidth}
			/>

			<main
				style={{
					marginLeft: isDrawerOpen ? `${drawerWidth}px` : "0",
					transition: "all 0.1s ease-out",
					marginTop: "100px",
				}}
			>
				<Outlet />
			</main>
		</>
	);
};
