import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout";
import { ClientsPage } from "../pages";

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
