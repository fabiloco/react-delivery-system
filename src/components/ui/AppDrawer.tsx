import { FC } from "react";

import {
	Divider,
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material";

import {
	Person,
	Receipt,
	Inbox,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


interface Props {
	isDrawerOpen: boolean;
	drawerWidth: number;
};

export const AppDrawer: FC<Props> = ({ isDrawerOpen, drawerWidth }) => {

	const navigate = useNavigate();

	return (
		<Drawer
			open={isDrawerOpen}
			variant="persistent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}
		>
			<Toolbar />
			<Box sx={{ overflow: "auto" }}>
				<List>
					<ListItem disablePadding>
						<ListItemButton
							onClick={() => navigate("/clients")}
						>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary={"Clients"} />
						</ListItemButton>
					</ListItem>

					<ListItem disablePadding>
						<ListItemButton
							onClick={() => navigate("/invoces")}
						>
							<ListItemIcon>
								<Receipt />
							</ListItemIcon>
							<ListItemText primary={"Invoices"} />
						</ListItemButton>
					</ListItem>

					<ListItem disablePadding>
						<ListItemButton
							onClick={() => navigate("/packages")}
						>
							<ListItemIcon>
								<Inbox />
							</ListItemIcon>
							<ListItemText primary={"Packages"} />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
			</Box>
		</Drawer>
	);
};
