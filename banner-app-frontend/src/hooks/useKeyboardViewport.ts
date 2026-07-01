import { useState, useEffect } from "react";

function useKeyboardViewport() {
	const [viewport, setViewport] = useState({
		height: window.visualViewport?.height ?? window.innerHeight,
		keyboardOpen: false,
	});

	useEffect(() => {
		const vv = window.visualViewport;
		if (!vv) return;

		const onResize = () => {
			const delta = Math.abs(window.innerHeight - vv.height);
			const keyboardOpen = delta > 150;
			setViewport({ height: vv.height, keyboardOpen });
		};

		vv.addEventListener("resize", onResize);
		// vv.addEventListener("scroll", onResize);
		onResize();

		return () => {
			vv.removeEventListener("resize", onResize);
			// vv.removeEventListener("scroll", onResize);
		};
	}, []);

	return viewport;
}

export { useKeyboardViewport };
