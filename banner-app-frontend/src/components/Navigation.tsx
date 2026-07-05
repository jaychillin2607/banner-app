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
					Banner
				</li>
				<li className="pageLink" onClick={loadAboutPage}>
					About
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
