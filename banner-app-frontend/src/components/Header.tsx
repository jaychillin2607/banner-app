import { Link } from "react-router";

import Navbar from "./Navigation";
import Box from "./Box";

function Header() {
	return (
		<header className="header">
			<Box className="navbar">
				<Link to="/" className="logo flex-row-center">
					<img src="/favicon.svg" alt="banner icon" className="logo-image" />
					<h1 className="logo-name">Banner</h1>
				</Link>
				<Navbar />
			</Box>
		</header>
	);
}

export default Header;
