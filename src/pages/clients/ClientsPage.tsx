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

import { Delete, Description, Edit } from "@mui/icons-material";

import { useSnackbar } from "notistack";

import { AltertDialog } from "../../shared/AltertDialog";

import { IClient } from "../../interfaces/Interfaces";

import {
	deleteClient,
	getAllClients,
	LIMIT_PER_PAGE,
} from "../../services/ClientService";

import { getNumberOfPages } from "../../utils";

interface ClientsPageState {
	items: Array<IClient>;
	totalResults: number;
}

export const ClientsPage = () => {
	const [actualPage, setActualPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>();

	const [clientSelected, setClientSelected] = useState<IClient>();

	const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

	const [clientsPageState, setClientsPageState] =
		useState<ClientsPageState>();

	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();

	const fetchClients = async () => {
		const res = await getAllClients(actualPage);
		setClientsPageState(res);
		setTotalPages(getNumberOfPages(res.totalResults, LIMIT_PER_PAGE));
		setLoading(false);
	};

	const handleOnDelete = async () => {
		setLoading(true);
		if (clientSelected) {
			const res = await deleteClient(clientSelected.id);

			if (res) {
				enqueueSnackbar(res.message, {
					variant: "success",
				});
			} else {
				enqueueSnackbar(res.message, {
					variant: "error",
				});
			}

			fetchClients();
		}
		setLoading(false);
	};

	const handleOnClickDeleteBtn = (client: IClient) => {
		setClientSelected(client);
		setIsAlertDialogOpen(!isAlertDialogOpen);
	};

	const handleOnClickEditBtn = (client: IClient) => {
		setClientSelected(client);
		navigate(`/edit-client/${client.id}`);
	};

	const handleOnClickDetailsBtn = (client: IClient) => {
		setClientSelected(client);
		navigate(`/detail-client/${client.id}`);
	};

	useEffect(() => {
		fetchClients();
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
					Clients
				</Typography>
				<div>
					<Button
						onClick={() => navigate("/new-client")}
						variant="contained"
					>
						Add new client
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
										National ID
									</TableCell>
									<TableCell
										align="center"
										sx={{ fontWeight: "bold" }}
									>
										Firstname
									</TableCell>
									<TableCell
										align="center"
										sx={{ fontWeight: "bold" }}
									>
										Lastname
									</TableCell>
									<TableCell
										align="center"
										sx={{ fontWeight: "bold" }}
									>
										Zipcode
									</TableCell>
									<TableCell
										align="center"
										sx={{ fontWeight: "bold" }}
									>
										Address
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
								{clientsPageState?.items.map(
									(client, index) => (
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
												{client.nationalId}
											</TableCell>
											<TableCell align="center">
												{client.name}
											</TableCell>
											<TableCell align="center">
												{client.lastName}
											</TableCell>
											<TableCell align="center">
												{client.zipCode}
											</TableCell>
											<TableCell align="center">
												{client.address}
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
														aria-label="details"
														onClick={() =>
															handleOnClickDetailsBtn(
																client
															)
														}
													>
														<Description />
													</IconButton>

													<IconButton
														aria-label="edit"
														color="primary"
														onClick={() =>
															handleOnClickEditBtn(
																client
															)
														}
													>
														<Edit />
													</IconButton>
													<IconButton
														aria-label="delete"
														color="error"
														onClick={() =>
															handleOnClickDeleteBtn(
																client
															)
														}
													>
														<Delete />
													</IconButton>
												</Stack>
											</TableCell>
										</TableRow>
									)
								)}
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
