import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";

import { useSnackbar } from "notistack";

import { IEditClient } from "../../interfaces/Interfaces";

import { getClientById, updateClient } from "../../services/ClientService";

export const EditClientPage = () => {
	const [newClient, setNewClient] = useState<IEditClient>({
		name: "",
		lastName: "",
		address: "",
		zipCode: 0,
	});

	const [nidClient, setNidClient] = useState<string>("");

	const [loading, setLoading] = useState<boolean>(true);

	const { idClient } = useParams();

	const { enqueueSnackbar } = useSnackbar();

	const navigate = useNavigate();

	const fetchOldClient = async () => {
		setLoading(true);
		const { client } = await getClientById(idClient as string);

		setNidClient(client.nationalId);

		setNewClient({
			name: client.name,
			lastName: client.lastName,
			address: client.address,
			zipCode: client.zipCode,
		});

		setLoading(false);
	};

	const handleOnChangeInput = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setNewClient({
			...newClient,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);
		const res = await updateClient(idClient as string, newClient);
		if (res) {
			if (res.client) {
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
						Edit client
					</Typography>
				</Box>

				<Paper sx={{ p: 4 }}>
					<form onSubmit={(e) => handleOnSubmitForm(e)}>
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
									value={newClient.name}
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
									value={newClient.lastName}
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
									disabled={true}
									onChange={(e) => handleOnChangeInput(e)}
									value={nidClient}
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
									value={newClient.zipCode}
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
									value={newClient.address}
								/>
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
