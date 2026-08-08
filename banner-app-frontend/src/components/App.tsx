import { Route, Routes } from "react-router";

import "../App.css";
import Header from "./Header";
import Page from "./Page";
import About from "./About";
import Banner from "./Banner";

function App() {
	return (
		<main id="app">
			<Header />
			<Page>
				<Routes>
					<Route path="banner" element={<Banner />} />
					<Route path="about" element={<About />} />
					<Route path="/*" element={<Banner />} />
				</Routes>
			</Page>
		</main>
	);
}

export default App;
