import type { PageType } from "../types/types";

function Navbar({
	setCurrentPage,
}: {
	setCurrentPage: (page: PageType) => void;
}) {
	let loadBannerPage = () => {
		setCurrentPage("BANNER");
	};
	let loadAboutPage = () => {
		setCurrentPage("ABOUT");
	};
	return (
		<nav className="navigation">
			<ul className="flex-row-center">
				<li className="pageLink" onClick={loadBannerPage}>
					<h3>Banner</h3>
				</li>
				<li className="pageLink" onClick={loadAboutPage}>
					<h3>About</h3>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
