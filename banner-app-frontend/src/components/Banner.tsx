import { useState } from "react";

import Box from "./Box";
// import { useKeyboardViewport } from "../hooks/useKeyboardViewport";

function getBannerDimensions(): number[] | null {
	let bannerCanvas = document.querySelector(".banner");
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

function isValidHeight(
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

function getTextSize(text: string, bannerDimensions: number[]): number {
	const [H, W] = bannerDimensions;
	let longestWord = getLongestWordLength(text); // +1 for space character

	// height based
	let fontSizeH = Math.floor(
		H / Math.ceil(text.length / (longestWord + 1) + 1) / 1.2,
	);
	// width based
	let fontSizeW = Math.floor(W / (longestWord + 1) / 0.66);
	// console.log("dimensions", `${H}x${W}`, "font size", fontSizeH, fontSizeW);
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
	// console.log("calculated font size", high);

	return high;
}

function Banner() {
	const [bannerInputValue, setBannerInputValue] = useState<string>("");
	const [messageFontSize, setMessageFontSize] = useState<number>(32);

	let updateBannerOnTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
		let text = event.target.value;
		let bannerDimensions = getBannerDimensions();
		if (bannerDimensions === null) {
			return;
		}
		setMessageFontSize(getTextSize(text, bannerDimensions));
		setBannerInputValue(text);
	};

	let placeholderMessage = <p className="placeholder-message">Type Here!</p>;
	let bannerMessage = (
		<p
			className="message"
			style={{
				fontSize: `${messageFontSize}px`,
			}}
		>
			{bannerInputValue}
		</p>
	);

	let decreaseBannerViewPort = "";
	let focusBannerInput = () => {
		document.getElementById("banner-input")?.focus();
		decreaseBannerViewPort = "decrease-viewport";
	};

	return (
		<section className="banner flex-row-center" onClick={focusBannerInput}>
			<Box className={"flex-column-center " + decreaseBannerViewPort}>
				{bannerInputValue ? bannerMessage : placeholderMessage}
				<input
					id="banner-input"
					name="banner-input"
					className="visually-hidden"
					onChange={updateBannerOnTyping}
					autoFocus={true}
				></input>
			</Box>
		</section>
	);
}

export default Banner;
