import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
	Box,
	Button,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
} from "@mui/material";


import {
	IClient,
	IInvoiceWithClientsAndPackages,
	IItem,
	ITrack,
} from "../../interfaces/Interfaces";

import { getInvoiceById } from "../../services/InvoiceService";

import { Add, Remove } from "@mui/icons-material";

export const DetailsInvoicePage = () => {
	const [invoice, setInvoice] = useState<IInvoiceWithClientsAndPackages>({
		id: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		date: new Date(),
		total: 0,
		packages: [],
		client: {
			address: "",
			id: "",
			lastName: "",
			name: "",
			nationalId: 0,
			zipCode: 0,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	const { idInvoice } = useParams();

	const [loading, setLoading] = useState<boolean>(false);


	const navigate = useNavigate();

	const fetchInvoice = async () => {
		const res = await getInvoiceById(idInvoice as string);
		console.log(res);
		setInvoice(res.invoice);
	};

	useEffect(() => {
		fetchInvoice();
	}, []);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					width: "full",
					height: "70vh",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularProgress />
			</Box>
		);
	} else {
		return (
			<Container maxWidth="sm">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						mb: "28px",
					}}
				>
					<Typography variant="h4" component="h2">
						Invoice details
					</Typography>
				</Box>

				<Paper sx={{ p: 4 }}>
					<form onSubmit={(e) => e.preventDefault()}>
						<Grid container spacing={3}>
							<Grid item xs={12}>

							</Grid>

							<Grid
								item
								xs={12}
								sm={6}
								sx={{ display: "flex", alignItems: "center" }}
							>
								<FormControl fullWidth>
									<TextField
										required
										id="Date"
										name="Date"
										fullWidth
										autoComplete="Date"
										variant="standard"
										value={invoice.date}
										onChange={(e) => e.preventDefault()}
										disabled
									/>
								</FormControl>
							</Grid>

							<Grid
								item
								xs={12}
								sm={6}
								sx={{ display: "flex", alignItems: "center" }}
							>
								<FormControl fullWidth>
									<TextField
										required
										id="Total"
										name="Total"
										fullWidth
										autoComplete="Total"
										variant="standard"
										value={`$ ${invoice.total}`}
										onChange={(e) => e.preventDefault()}
										disabled
									/>
								</FormControl>
							</Grid>

							<Grid
								item
								xs={12}
								sx={{ display: "flex", alignItems: "center" }}
							>
								<Typography variant="h6">Client</Typography>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="name"
									name="name"
									label="First name"
									fullWidth
									autoComplete="given-name"
									variant="standard"
									onChange={(e) => e.preventDefault()}
									value={invoice.client.name}
									disabled
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="lastName"
									name="lastName"
									label="Last name"
									fullWidth
									autoComplete="family-name"
									variant="standard"
									onChange={(e) => e.preventDefault()}
									value={invoice.client.lastName}
									disabled
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									type="text"
									inputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
									}}
									id="nationalId"
									name="nationalId"
									label="National ID"
									autoComplete="id"
									fullWidth
									variant="standard"
									onChange={(e) => e.preventDefault()}
									value={invoice.client.nationalId}
									disabled
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									type="text"
									inputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
									}}
									id="zipCode"
									name="zipCode"
									label="Zip / Postal code"
									fullWidth
									autoComplete="shipping postal-code"
									variant="standard"
									onChange={(e) => e.preventDefault()}
									value={invoice.client.zipCode}
									disabled
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id="address"
									name="address"
									label="Address"
									fullWidth
									autoComplete="shipping address-line1"
									variant="standard"
									onChange={(e) => e.preventDefault()}
									value={invoice.client.address}
									disabled
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sx={{ display: "flex", alignItems: "center" }}
							>
								<Typography variant="h6">Packages</Typography>
							</Grid>

							<Grid
								item
								xs={12}
							>
								<List sx={{ marginTop: -2 }}>
									{invoice.packages.map((item, index) => {
										return (
											<ListItem
												disablePadding
												key={index}
											>
												<ListItemButton>
													<ListItemText>
														<Box
															sx={{
																display: "flex",
																justifyContent:
																	"space-between",
															}}
														>
															<Typography>
																{index + 1}.
																{" "}
																{item.name}
															</Typography>
															<Typography>
																Price: $
																{item.price}
															</Typography>
														</Box>
													</ListItemText>
												</ListItemButton>
											</ListItem>
										);
									})}
								</List>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Button
									variant="outlined"
									onClick={() => navigate(-1)}
								>
									Back
								</Button>
							</Grid>

							<Grid
								item
								xs={12}
								sm={6}
								sx={{ textAlign: "right" }}
							>
								<Button variant="contained" type="submit">
									Send
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Container>
		);
	}
};
