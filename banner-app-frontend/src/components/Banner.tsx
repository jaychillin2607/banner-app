import Box from "./Box";

function Banner() {
	return (
		<section className="banner flex-row-center">
			<Box className="flex-column-center">
				<p>This is Banner.</p>
                <input id="canvas-input" name="canvas-input" type="text"></input>
			</Box>
		</section>
	);
}

export default Banner;
