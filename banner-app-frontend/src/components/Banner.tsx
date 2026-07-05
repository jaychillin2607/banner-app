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

function Banner() {
	const [bannerInputValue, setBannerInputValue] = useState<string>("");
	const [messageFontSize, setMessageFontSize] = useState<number>(32);

	resizeBannerOnViewportUpdate(useKeyboardViewport());
	removeHeaderInLandscape(useDisplayOrientation());

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

	return (
		<section className="banner flex-row-center" onClick={focusBannerInput}>
			<Box className={"flex-column-center"}>
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
