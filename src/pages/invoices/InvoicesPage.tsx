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

import { Delete, Description } from "@mui/icons-material";

import { useSnackbar } from "notistack";

import { AltertDialog } from "../../shared/AltertDialog";

import { IInvoice } from "../../interfaces/Interfaces";

import { getNumberOfPages } from "../../utils";
import {
	LIMIT_PER_PAGE,
	deleteInvoice,
	getAllInvoices,
} from "../../services/InvoiceService";

interface InvoicesPageState {
	items: Array<IInvoice>;
	totalResults: number;
}

export const InvoicesPage = () => {
	const [actualPage, setActualPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>();

	const [invoiceSelected, setInvoiceSelected] = useState<IInvoice>();

	const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

	const [invoicesPageState, setInvoicesPageState] =
		useState<InvoicesPageState>();

	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const { enqueueSnackbar } = useSnackbar();

	const fetchInvoces = async () => {
		const res = await getAllInvoices(actualPage);
		setInvoicesPageState(res);
		setTotalPages(getNumberOfPages(res.totalResults, LIMIT_PER_PAGE));
		setLoading(false);
	};

	const handleOnDelete = async () => {
		setLoading(true);
		if (invoiceSelected) {
			const res = await deleteInvoice(invoiceSelected.id);

			if (res) {
				enqueueSnackbar(res.message, {
					variant: "success",
				});
			} else {
				enqueueSnackbar(res.message, {
					variant: "error",
				});
			}

			fetchInvoces();
		}
		setLoading(false);
	};

	const handleOnClickDeleteBtn = (invoice: IInvoice) => {
		setInvoiceSelected(invoice);
		setIsAlertDialogOpen(!isAlertDialogOpen);
	};

	const handleOnClickDetailsBtn = (invoice: IInvoice) => {
		setInvoiceSelected(invoice);
		navigate(`/detail-invoice/${invoice.id}`);
	};

	useEffect(() => {
		fetchInvoces();
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
					Invoices
				</Typography>
				<div>
					<Button
						onClick={() => navigate("/new-invoice")}
						variant="contained"
					>
						Add new invoice
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
										Date
									</TableCell>
									<TableCell
										align="center"
										sx={{ fontWeight: "bold" }}
									>
										Total
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
								{invoicesPageState?.items.map(
									(invoce, index) => (
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
												{invoce.date}
											</TableCell>
											<TableCell align="center">
												{invoce.total}
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
																invoce
															)
														}
													>
														<Description />
													</IconButton>

													<IconButton
														aria-label="delete"
														color="error"
														onClick={() =>
															handleOnClickDeleteBtn(
																invoce
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
