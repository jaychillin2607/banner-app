import { NavLink } from "react-router";

function Navbar() {
	return (
		<nav className="navigation">
			<ul className="flex-row-center">
				<li className="pageLink">
					<NavLink to="/banner">
						<h3>Banner</h3>
					</NavLink>
				</li>
				<li className="pageLink">
					<NavLink to="/about">
						<h3>About</h3>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
