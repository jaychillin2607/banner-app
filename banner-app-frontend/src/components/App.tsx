import React, { useState } from "react";

import { type PageType } from "../types/PageType";
import "../App.css";
import Header from "./Header";
import Page from "./Page";
import About from "./About";
import Banner from "./Banner";

function App() {
	const [currentPage, setCurrentPage] = useState<PageType>("BANNER");
	let RenderPage: React.ElementType;
	switch (currentPage) {
		case "BANNER":
			RenderPage = Banner;
			break;
		case "ABOUT":
			RenderPage = About;
			break;
	}
	return (
		<main className="app">
			<Header setCurrentPage={setCurrentPage} />
			<Page >
				<RenderPage />
			</Page>
		</main>
	);
}

export default App;
