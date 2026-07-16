import { useState } from "react";

import Box from "./Box";
import useKeyboardViewport from "../hooks/useKeyboardViewport";
import useDisplayOrientation from "../hooks/useDisplayOrientation";

import {
	resizeBannerOnViewportUpdate,
	getBannerDimensions,
	getTextSize,
	removeHeaderInLandscape,
} from "../helpers/bannerHelpers";
import { DEVICE_TYPE } from "../configurations/config";

function Banner() {
	const [bannerInputValue, setBannerInputValue] = useState<string>("");
	const [messageFontSize, setMessageFontSize] = useState<number>(32);
	const [isBannerInputFocused, setIsBannerInputFocused] =
		useState<boolean>(false);
	resizeBannerOnViewportUpdate(useKeyboardViewport());
	if (DEVICE_TYPE === "SMARTPHONE") {
		removeHeaderInLandscape(useDisplayOrientation());
	}

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

	let focusBannerInput = () => {
		document.getElementById("banner-input")?.focus();
	};

	// input widget
	let inputWidgetClassNames = "visually-hidden";
	if (
		isBannerInputFocused &&
		(DEVICE_TYPE === "SMARTPHONE" || DEVICE_TYPE === "TABLET")
	) {
		inputWidgetClassNames = "sticky-bottom";
	}

	return (
		<>
			<section className="banner flex-row-center" onClick={focusBannerInput}>
				<Box className={"flex-column-center"}>
					{bannerInputValue ? bannerMessage : placeholderMessage}
				</Box>
			</section>
			<input
				id="banner-input"
				name="banner-input"
				className={inputWidgetClassNames}
				onChange={updateBannerOnTyping}
				onFocus={() => {
					setIsBannerInputFocused(true);
				}}
				onBlur={() => {
					setIsBannerInputFocused(false);
				}}
			></input>
		</>
	);
}

export default Banner;
