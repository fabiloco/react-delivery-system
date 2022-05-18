import { FC, useState } from "react";

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
	Collapse,
} from "@mui/material";

import {
	Person,
	Receipt,
	Inbox,
	ExpandLess,
	ExpandMore,
	StarBorder,
	LocalShipping,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


interface Props {
	isDrawerOpen: boolean;
	drawerWidth: number;
};

export const AppDrawer: FC<Props> = ({ isDrawerOpen, drawerWidth }) => {
	const [isPackageListOpen, setIsPackageListOpen] = useState(true);

	const handleClickPackageListBtn = () => {
	  setIsPackageListOpen(!isPackageListOpen);
	};

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

					<ListItemButton onClick={handleClickPackageListBtn}>
						<ListItemIcon>
							<Inbox />
						</ListItemIcon>
						<ListItemText primary="Packages" />
						{isPackageListOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse in={isPackageListOpen} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							<ListItemButton
								sx={{ pl: 4 }}
								onClick={() => navigate("/tracks")}
							>
								<ListItemIcon>
									<LocalShipping />
								</ListItemIcon>
								<ListItemText primary="Tracks" />
							</ListItemButton>
						</List>
					</Collapse>
				</List>
				<Divider />
			</Box>
		</Drawer>
	);
};
