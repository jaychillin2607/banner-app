import { useState, useEffect } from "react";

export default function useKeyboardViewport() {
	const [viewport, setViewport] = useState<{
		height: number;
		isKeyboardOpen: boolean;
	}>({
		height: window.visualViewport?.height ?? window.innerHeight,
		isKeyboardOpen: false,
	});

	useEffect(() => {
		const vv = window.visualViewport;
		if (!vv) return;

		const onResize = () => {
			// alert(`resize event fired${window.innerHeight}, ${vv.height}`);

			const delta = Math.abs(window.innerHeight - vv.height);
			const isKeyboardOpen = delta > 100;
			setViewport({ height: vv.height, isKeyboardOpen });
		};

		vv.addEventListener("resize", onResize);
		vv.addEventListener("scroll", onResize);
		onResize();

		return () => {
			vv.removeEventListener("resize", onResize);
			vv.removeEventListener("scroll", onResize);
		};
	}, []);

	return viewport;
}
