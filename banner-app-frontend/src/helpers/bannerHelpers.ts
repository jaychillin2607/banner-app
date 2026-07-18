import type { DisplayOrientation } from "../types/types";

export function getElementDimensions(className: string): number[] | null {
	let bannerCanvas = document.querySelector(className);
	if (bannerCanvas === null) {
		console.error("error getting banner canvas");
		return null;
	}
	let cssComputedStyle = getComputedStyle(bannerCanvas);
	let height = cssComputedStyle.height.slice(0, -2),
		width = cssComputedStyle.width.slice(0, -2); // remove pixel

	let result = [parseInt(height), parseInt(width)];
	result = [Math.max(result[0] - 10, 0), Math.max(result[1] - 10, 0)]; // subtracted padding.

	return result;
}

function getLongestWordLength(text: string): number {
	let res = 0,
		count = 0;
	for (let i = 0; i < text.length; i++) {
		if (text[i] === " ") {
			res = Math.max(res, count);
			count = 0;
			continue;
		}
		count++;
	}
	res = Math.max(res, count);
	return res;
}

export function isValidHeight(
	height: number,
	lineLength: number,
	textLength: number,
	H: number,
	W: number,
): boolean {
	while (lineLength <= textLength) {
		let lineCount = Math.ceil(textLength / lineLength);
		let lineHeight = Math.floor(lineCount * height * 1.2),
			lineWidth = Math.floor(lineLength * height * 0.66);
		if (lineWidth <= W && lineHeight <= H) {
			return true;
		}
		lineLength += 4;
	}
	return false;
}

export function resizeBannerOnViewportUpdate({
	height,
	isKeyboardOpen,
}: {
	height: number;
	isKeyboardOpen: boolean;
}) {
	let newHeight = "100%";
	if (isKeyboardOpen) {
		newHeight = `${height}px`;
	}

	let app = document.getElementById("app");
	if (app) {
		app.style.height = newHeight;
	}
}

export function getTextSize(text: string, bannerDimensions: number[]): number {
	const [H, W] = bannerDimensions;
	let longestWord = getLongestWordLength(text);

	// +1 for space character
	// height based
	let fontSizeH = Math.floor(
		H / Math.ceil(text.length / (longestWord + 1) + 1) / 1.2,
	);
	// width based
	let fontSizeW = Math.floor(W / (longestWord + 1) / 0.66);

	let low = Math.min(fontSizeH, fontSizeW),
		high = Math.max(fontSizeH, fontSizeW);

	while (low <= high) {
		let mid = Math.floor((low + high) / 2);

		if (isValidHeight(mid, longestWord, text.length, H, W)) {
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	return high;
}

export function removeHeaderInLandscape(
	displayOrientation: DisplayOrientation,
) {
	let header: HTMLElement | null = document.querySelector(".header");
	if (!header) {
		return;
	}
	if (displayOrientation === "PORTRAIT") {
		header.style.display = "";
	} else {
		header.style.display = "none";
	}
}
