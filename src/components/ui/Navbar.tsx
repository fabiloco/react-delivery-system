import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	IconButton,
} from "@mui/material";

import { Menu } from "@mui/icons-material";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
	isDrawerOpen: boolean;
	setIsDrawerOpen: (a: boolean) => void;
};

export const Navbar: FC<Props> = ({ isDrawerOpen, setIsDrawerOpen }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => setIsDrawerOpen(!isDrawerOpen)}
					>
						<Menu />
					</IconButton>
					<Link
						to="/"
						style={{ textDecoration: "none" }}
					>
						<Typography
							variant="h6"
							component="div"
							color="white"
							sx={{ flexGrow: 1 }}
						>
							📦 Delivery system
						</Typography>
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
