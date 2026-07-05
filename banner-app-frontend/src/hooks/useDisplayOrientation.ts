import { useEffect, useState } from "react";
import { type DisplayOrientation } from "../types/types";

export default function useDisplayOrientation(): DisplayOrientation {
	const [displayOrientation, setDisplayOrientation] =
		useState<DisplayOrientation>("PORTRAIT");

	useEffect(() => {
		let vv = window.visualViewport;

		let onResize = () => {
			if (vv) {
				let height = vv.height;
				let width = vv.width;
				if (width <= 0.76 * height) {
					setDisplayOrientation("PORTRAIT");
				} else {
					setDisplayOrientation("LANDSCAPE");
				}
			}
		};

		window.addEventListener("resize", onResize);
		onResize();

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return displayOrientation;
}
