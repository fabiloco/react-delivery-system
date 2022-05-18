import { ChangeEvent, FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

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

import { INewTrack } from "../../interfaces/Interfaces";
import { createNewTrack } from "../../services/PackageService";

export const NewTrackPage = () => {
	const [newTrack, setNewTrack] = useState<INewTrack>({
		cost: 0,
		destiny: "",
		origin: ""
	});

	const [loading, setLoading] = useState<boolean>(false);

	const { enqueueSnackbar } = useSnackbar();

	const navigate = useNavigate();

	const handleOnChangeInput = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setNewTrack({
			...newTrack,
			[e.target.name]: e.target.value,
		});
	};

	const handleOnSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading(true);
		const res = await createNewTrack(newTrack);
		if (res) {
			if (res.ok) {
				enqueueSnackbar(res.message, {
					variant: "success",
				});
				navigate("/tracks");
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
						New track
					</Typography>
				</Box>

				<Paper sx={{ p: 4 }}>
					<form onSubmit={(e) => handleOnSubmitForm(e)}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									required
									id="origin"
									name="origin"
									label="Origin"
									fullWidth
									autoComplete="origin"
									variant="standard"
									onChange={(e) => handleOnChangeInput(e)}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									id="destiny"
									name="destiny"
									label="Destiny"
									fullWidth
									autoComplete="destiny"
									variant="standard"
									onChange={(e) => handleOnChangeInput(e)}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									type="text"
									inputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
									}}
									id="cost"
									name="cost"
									label="Cost"
									fullWidth
									autoComplete="cost"
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
