import type React from "react";
import { cleanCSS } from "../common/cssUtils";

function Box({
	className,
	children,
}: {
	className?: string;
	children: React.ReactElement[];
}) {
	return <div className={cleanCSS("box", className)}>{...children}</div>;
}

export default Box;
