import { ChangeEvent, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	TextField,
	Typography,
} from "@mui/material";

import { IClientWithInvoices } from "../../interfaces/Interfaces";

import { getClientById } from "../../services/ClientService";

export const DetailsClientPage = () => {
	const [client, setClient] = useState<IClientWithInvoices>({
		address: "",
		id: "",
		invoices: [],
		lastName: "",
		name: "",
		nationalId: 0,
		zipCode: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

	const [loading, setLoading] = useState<boolean>(true);

	const { idClient } = useParams();

	const navigate = useNavigate();

	const fetchOldClient = async () => {
		setLoading(true);
		const { client } = await getClientById(idClient as string);

		setClient(client);

		setLoading(false);
	};

	const handleOnChangeInput = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setClient({
			...client,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		fetchOldClient();
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
						Client details
					</Typography>
				</Box>

				<Paper sx={{ p: 4 }}>
					<form onSubmit={(e) => e.preventDefault()}>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="name"
									name="name"
									label="First name"
									fullWidth
									autoComplete="given-name"
									variant="standard"
									onChange={(e) => handleOnChangeInput(e)}
									value={client.name}
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
									onChange={(e) => handleOnChangeInput(e)}
									value={client.lastName}
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
									onChange={(e) => handleOnChangeInput(e)}
									value={client.nationalId}
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
									onChange={(e) => handleOnChangeInput(e)}
									value={client.zipCode}
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
									onChange={(e) => handleOnChangeInput(e)}
									value={client.address}
									disabled
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sm={6}
								sx={{ display: "flex", alignItems: "center" }}
							>
								<Typography variant="h6">Invoices</Typography>
							</Grid>

							<Grid
								item
								xs={12}
								sm={6}
								sx={{ display: "flex", alignItems: "center" }}
							></Grid>

							<Grid item xs={12}>
								<List sx={{ marginTop: -2 }}>
									{client.invoices.map((item, index) => {
										return (
											<ListItem
												disablePadding
												key={index}
											>
												<ListItemButton
													onClick={(e) =>
														navigate(
															`/detail-invoice/${item.id}`
														)
													}
												>
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
																Date:{" "}
																{item.date}
															</Typography>
															<Typography>
																Total: $
																{item.total}
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
						</Grid>
					</form>
				</Paper>
			</Container>
		);
	}
};
