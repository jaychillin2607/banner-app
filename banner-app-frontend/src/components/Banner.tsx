import { useState } from "react";

import Box from "./Box";

function Banner() {
	const [bannerInputValue, setBannerInputValue] = useState("");

	let updateBannerOnTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBannerInputValue(event.target.value);
	};
	let placeholderMessage = (
		<p className="banner-placeholder-message">Type Here!</p>
	);
	let bannerMessage = <p className="banner-message">{bannerInputValue}</p>;

	let focusBannerInput = () => {
		document.getElementById("banner-input")?.focus();
	};
	return (
		<section className="banner flex-row-center" onClick={focusBannerInput}>
			<Box className="flex-column-center">
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
