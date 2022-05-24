import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

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
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	Stack,
	TextField,
	Typography,
} from "@mui/material";

import { useSnackbar } from "notistack";

import {
	IClient,
	IItem,
	INewInvoice,
	ITrack,
} from "../../interfaces/Interfaces";
import { createNewClient, getAllClients } from "../../services/ClientService";
import { Add, Remove } from "@mui/icons-material";
import { getAllTracks } from "../../services/PackageService";
import { createNewInvoice } from "../../services/InvoiceService";

export const NewInvoicePage = () => {
	const [clients, setClients] = useState<Array<IClient>>([]);

	const [items, setItems] = useState<Array<IItem>>([
		{
			name: "",
			price: 0,
			trackId: "",
		},
	]);

	const [newInvoice, setNewInvoice] = useState<INewInvoice>({
		clientId: "",
		date: new Date(),
		items: items,
	});

	const [tracks, setTracks] = useState<Array<ITrack>>([]);

	const [loading, setLoading] = useState<boolean>(false);

	const { enqueueSnackbar } = useSnackbar();

	const navigate = useNavigate();

	const fetchClients = async () => {
		setLoading(true);
		const { items } = await getAllClients(1, 100);
		setClients(items);
		setLoading(false);
	};

	const fetchTracks = async () => {
		const { items } = await getAllTracks(1, 100);
		setTracks(items);
		setLoading(false);
	};

	const handleOnAddItem = () => {
		setItems((prevItems) => {
			prevItems.push({
				name: "",
				price: 0,
				trackId: "",
			});
			return [...prevItems];
		});
	};

	const handleOnRemoveItem = () => {
		setItems((prevItems) => {
			prevItems.pop();
			return [...prevItems];
		});
	};

	const handleOnChangeItemsInput = (
		index: number,
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		let changedItem: IItem = {
			...items[index],
			[e.target.name]: e.target.value,
		};
		items[index] = changedItem;
		setItems(items);

		setNewInvoice({
			...newInvoice,
			items,
		});
	};

	const handleOnChangeSelectTrack = (
		index: number,
		e: SelectChangeEvent<string>
	) => {
		setNewInvoice((prev) => {
			prev.items[index].trackId = e.target.value;

			return { ...prev };
		});
	};

	const handleOnChangeSelectClient = (e: SelectChangeEvent<string>) => {
		setNewInvoice({
			...newInvoice,
			clientId: e.target.value,
		});
	};

	const handleOnSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(newInvoice);

		setLoading(true);
		const res = await createNewInvoice(newInvoice);
		console.log(res);
		if (res) {
			if (res.invoice) {
				enqueueSnackbar(res.message, {
					variant: "success",
				});
				navigate("/clients");
			} else {
				enqueueSnackbar(res.message, {
					variant: "info",
				});
			}
		} else {
			enqueueSnackbar("There's something wrong with the data!", {
				variant: "error",
			});
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchClients();
		fetchTracks();
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
						New invoice
					</Typography>
				</Box>

				<Paper sx={{ p: 4 }}>
					<form onSubmit={(e) => handleOnSubmitForm(e)}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id="client-select">
										Client
									</InputLabel>
									{loading ? (
										<CircularProgress />
									) : (
										<Select
											labelId="client-select"
											id="client-select"
											label="Client"
											variant="standard"
											value={newInvoice.clientId}
											onChange={(e) =>
												handleOnChangeSelectClient(e)
											}
										>
											{clients.map((client, index) => {
												return (
													<MenuItem
														key={index}
														value={client.id}
													>
														{client.nationalId} -{" "}
														{client.name}
														{"  "}
														{client.lastName}
													</MenuItem>
												);
											})}
										</Select>
									)}
								</FormControl>
							</Grid>

							<Grid
								item
								xs={12}
								sm={6}
								sx={{ display: "flex", alignItems: "center" }}
							>
								<Typography variant="h6">Items</Typography>
							</Grid>

							<Grid item xs={12} sm={6}>
								<Stack
									direction="row"
									divider={
										<Divider
											orientation="vertical"
											flexItem
										/>
									}
									spacing={1}
									justifyContent="end"
									alignItems="center"
								>
									<IconButton
										aria-label="edit"
										color="primary"
										onClick={() => handleOnAddItem()}
									>
										<Add />
									</IconButton>
									<IconButton
										disabled={items.length < 2}
										aria-label="delete"
										color="error"
										onClick={() => handleOnRemoveItem()}
									>
										<Remove />
									</IconButton>
								</Stack>
							</Grid>

							{items.map((item, index) => {
								return (
									<React.Fragment key={index}>
										<Grid item xs={12} sm={6}>
											<TextField
												required
												type="text"
												id="name"
												name="name"
												label="Product name"
												fullWidth
												autoComplete="name"
												variant="standard"
												onChange={(e) =>
													handleOnChangeItemsInput(
														index,
														e
													)
												}
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
												id="price"
												name="price"
												label="Price"
												fullWidth
												autoComplete="price"
												variant="standard"
												onChange={(e) =>
													handleOnChangeItemsInput(
														index,
														e
													)
												}
											/>
										</Grid>
										<Grid item xs={12} marginBottom={3}>
											<FormControl fullWidth>
												<InputLabel id="track-select">
													Track
												</InputLabel>
												<Select
													labelId="track-select"
													id="track-select"
													label="Track"
													name="trackId"
													variant="standard"
													value={items[0].trackId}
													onChange={(e) =>
														handleOnChangeSelectTrack(
															index,
															e
														)
													}
												>
													{tracks.map(
														(tracks, index) => {
															return (
																<MenuItem
																	key={index}
																	value={
																		tracks.id
																	}
																>
																	{
																		tracks.origin
																	}{" "}
																	-{" "}
																	{
																		tracks.destiny
																	}{" "}
																	-{" "}
																	{
																		tracks.cost
																	}
																</MenuItem>
															);
														}
													)}
												</Select>
											</FormControl>
										</Grid>
									</React.Fragment>
								);
							})}

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
