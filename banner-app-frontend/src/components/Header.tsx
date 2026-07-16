import type { PageType } from "../types/types";

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
				<a
					className="logo flex-row-center"
					onClick={() => {
						setCurrentPage("BANNER");
					}}
				>
					<img src="/favicon.svg" alt="banner icon" className="logo-image" />
					<h1 className="logo-name">Banner</h1>
				</a>

				<Navbar setCurrentPage={setCurrentPage} />
			</Box>
		</header>
	);
}

export default Header;
