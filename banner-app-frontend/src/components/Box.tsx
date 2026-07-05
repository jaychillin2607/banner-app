import type React from "react";
import { cleanCSS } from "../helpers/common";

function Box({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return <div className={cleanCSS("box", className)}>{children}</div>;
}

export default Box;
