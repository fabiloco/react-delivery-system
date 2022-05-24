import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";

import { ClientsPage, EditClientPage, NewClientPage } from "../pages/clients";
import { InvoicesPage, NewInvoicePage } from "../pages/invoices";
import { TracksPage, NewTrackPage } from "../pages/tracks";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" />

						<Route path="/clients" element={<ClientsPage />} />

						<Route path="/new-client" element={<NewClientPage />} />

						<Route
							path="/edit-client/:idClient"
							element={<EditClientPage />}
						/>

						<Route path="/tracks" element={<TracksPage />} />

						<Route path="/new-track" element={<NewTrackPage />} />

						<Route path="/invoices" element={<InvoicesPage />} />

						<Route
							path="/new-invoice"
							element={<NewInvoicePage />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
