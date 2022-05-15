import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	IconButton,
	useTheme,
} from "@mui/material";

import { Menu, Brightness7, Brightness4  } from "@mui/icons-material";
import { createContext, FC, useContext } from "react";
import { Link } from "react-router-dom";

interface Props {
	isDrawerOpen: boolean;
	setIsDrawerOpen: (a: boolean) => void;
};

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const Navbar: FC<Props> = ({ isDrawerOpen, setIsDrawerOpen }) => {
	const theme = useTheme();
  	const colorMode = useContext(ColorModeContext);


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

					{/* {theme.palette.mode} mode
					<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
						{theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
					</IconButton> */}
				</Toolbar>
			</AppBar>
		</Box>
	);
};
