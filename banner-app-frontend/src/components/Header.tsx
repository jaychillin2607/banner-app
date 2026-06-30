import type { PageType } from "../types/PageType";

import Navbar from "./Navigation";
import Box from "./Box";

function Header({
	setCurrentPage,
}: {
	setCurrentPage: (page: PageType) => void;
}) {
	return (
		<header className="header">
			<Box className="navbar">
				<Box className="logo flex-row-center">
					<img src="/favicon.svg" alt="banner icon" className="logo-image" />
					<h1 className="logo-name">Banner</h1>
				</Box>

				<Navbar setCurrentPage={setCurrentPage} />
			</Box>
		</header>
	);
}

export default Header;
