import { useEffect, useState } from "react";

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
	Pagination
} from "@mui/material";

import { getAllClients } from "../services/ClientService";
import { IClient } from "../interfaces/Interfaces";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

interface ClientsPageState {
	items: Array<IClient>;
	totalPages: number;
	totalResults: number;
}

export const ClientsPage = () => {
	const [actualPage, setActualPage] = useState<number>(1);

	const [clientsPageState, setClientsPageState] =
		useState<ClientsPageState>();

	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const fetchClients = async () => {
		const res = await getAllClients(1);
		setClientsPageState(res);
		setLoading(false);
	};

	useEffect(() => {
		fetchClients();
	}, []);

	return (
		<Container maxWidth="lg">
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<Typography variant="h3" component="h2">
					Clients
				</Typography>
				<div>
					<Button onClick={() => navigate("/new-client")} variant="contained">Add new client</Button>
				</div>
			</Box>

			<Divider sx={{ mt: "4px", mb: "28px" }} />

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

			<Box sx={{ display: "flex", alignItems: "center", width: "full", justifyContent: "center", mt: "16px" }}>
				<Pagination count={clientsPageState?.totalPages} color="primary" />
			</Box>
		</Container>
	);
};
