import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
	CircularProgress,
	Container,
	Divider,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Button,
	Pagination,
	Box,
	Stack,
	IconButton,
} from "@mui/material";

import { Delete } from "@mui/icons-material";

import { useSnackbar } from "notistack";

import { AltertDialog } from "../../shared/AltertDialog";

import { ITrack } from "../../interfaces/Interfaces";

import {
	deleteTrack,
	getAllTracks,
	LIMIT_PER_PAGE,
} from "../../services/PackageService";

import { getNumberOfPages } from "../../utils";

interface TracksPageState {
	items: Array<ITrack>;
	totalResults: number;
}

export const TracksPage = () => {
	const [actualPage, setActualPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>();

	const [trackSelected, setTrackSelected] = useState<ITrack>();

	const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

	const [tracksPageState, setTracksPageState] = useState<TracksPageState>();

	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();

	const fetchTracks = async () => {
		const res = await getAllTracks(actualPage);
		setTracksPageState(res);
		setTotalPages(getNumberOfPages(res.totalResults, LIMIT_PER_PAGE));
		setLoading(false);
	};

	const handleOnDelete = async () => {
		setLoading(true);
		if (trackSelected) {
			const res = await deleteTrack(trackSelected.id);

			if (res) {
				enqueueSnackbar(res.message, {
					variant: "success",
				});
			} else {
				enqueueSnackbar(res.message, {
					variant: "error",
				});
			}

			fetchTracks();
		}
		setLoading(false);
	};

	const handleOnClickDeleteBtn = (track: ITrack) => {
		setTrackSelected(track);
		setIsAlertDialogOpen(!isAlertDialogOpen);
	};

	useEffect(() => {
		fetchTracks();
	}, [actualPage]);

	const handleOnChangePage = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setActualPage(value);
	};

	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mb: "28px",
				}}
			>
				<Typography variant="h4" component="h2">
					Tracks
				</Typography>
				<div>
					<Button
						onClick={() => navigate("/new-track")}
						variant="contained"
					>
						Add new track
					</Button>
				</div>
			</Box>

			{!loading ? (
				<>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell
										align="center"
										sx={{ fontWeight: "bold" }}
									>
										Origin
									</TableCell>
									<TableCell
										align="center"
										sx={{ fontWeight: "bold" }}
									>
										Destiny
									</TableCell>
									<TableCell
										align="center"
										sx={{ fontWeight: "bold" }}
									>
										Cost
									</TableCell>
									<TableCell
										align="center"
										sx={{ fontWeight: "bold" }}
									>
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{tracksPageState?.items.map((track, index) => (
									<TableRow
										key={index}
										sx={{
											"&:last-child td, &:last-child th":
												{
													border: 0,
												},
										}}
									>
										<TableCell
											component="th"
											scope="row"
											align="center"
										>
											{track.origin}
										</TableCell>
										<TableCell align="center">
											{track.destiny}
										</TableCell>
										<TableCell align="center">
											{track.cost}
										</TableCell>
										<TableCell align="center">
											<Stack
												direction="row"
												divider={
													<Divider
														orientation="vertical"
														flexItem
													/>
												}
												spacing={1}
												justifyContent="center"
												alignItems="center"
											>
												<IconButton
													aria-label="delete"
													color="error"
													onClick={() =>
														handleOnClickDeleteBtn(
															track
														)
													}
												>
													<Delete />
												</IconButton>
											</Stack>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			) : (
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
			)}

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					width: "full",
					justifyContent: "center",
					mt: "16px",
				}}
			>
				<Pagination
					count={totalPages}
					color="primary"
					onChange={handleOnChangePage}
				/>
			</Box>

			<AltertDialog
				isOpen={isAlertDialogOpen}
				toggleIsOpen={setIsAlertDialogOpen}
				title="Are you sure you want to delete this item?"
				content="This operation is permanent."
				agreeBtnText="Delete"
				action={handleOnDelete}
			/>
		</Container>
	);
};
