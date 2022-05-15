import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { ClientsPage, NewClientPage } from "../pages/clients";

function App() {
    return (
        <>
			<BrowserRouter>
				<Routes>
					<Route
						element={<Layout />}
					>
						<Route
							path="/"
						/>

						<Route
							path="/clients"
							element={<ClientsPage />}
						/>

						<Route
							path="/new-client"
							element={<NewClientPage />}
						/>

						<Route
							path="/invoces"
						/>

						<Route
							path="/packages"
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
    );
}

export default App;
