import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import BaseRouter from "./routes";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context";

function App() {
	return (
		<AuthProvider>
			<div className="app">
				<Router>
					<Navbar />
					<BaseRouter />
				</Router>
			</div>
		</AuthProvider>
	);
}

export default App;
