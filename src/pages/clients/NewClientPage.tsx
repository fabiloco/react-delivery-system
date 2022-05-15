import { ChangeEvent, FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";

import { useSnackbar } from "notistack";

import { INewClient } from "../../interfaces/Interfaces";
import { createNewClient } from "../../services/ClientService";

export const NewClientPage = () => {
	const [newClient, setNewClient] = useState<INewClient>({
		name: "",
		lastName: "",
		address: "",
		nationalId: 0,
		zipCode: 0,
	});

	const { enqueueSnackbar } = useSnackbar();

	const navigate = useNavigate();

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
		const res = await createNewClient(newClient);
		if (res) {
			enqueueSnackbar("Client created!", {
				variant: "success",
			});
			navigate("/clients");
		} else {
			enqueueSnackbar("There's something wrong with the data!", {
				variant: "error",
			});
		}
	};

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
					New client
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

						<Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
							<Button variant="contained" type="submit">
								Send
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};
