import type { PageType } from "../types/PageType";

import Navbar from "./Navigation";
import Box from "./Box";

function Header({
	setCurrentPage,
}: {
	setCurrentPage: (page: PageType) => void;
}) {
	return (
		<header>
			<Box className="navbar">
                <Box className="logo">
				<img src="/favicon.svg" alt="banner icon" className="logo-image"/>
                <h1 className="logo-name">Banner</h1>
                </Box>

				<Navbar setCurrentPage={setCurrentPage} />
			</Box>
		</header>
	);
}

export default Header;
