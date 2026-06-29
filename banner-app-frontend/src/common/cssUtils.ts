export function cleanCSS(...classNames: (string | undefined)[]): string {
	let cleanClassNames: string[] = classNames.filter((className) => typeof className !== "undefined")

	return cleanClassNames.join(" ");
}
