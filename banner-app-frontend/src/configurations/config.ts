import { type DeviceType } from "../types/types";

function findDeviceType(): DeviceType {
	let details = navigator.userAgent.toLowerCase();
	if (details.includes("android")) {
		return "SMARTPHONE";
	} else if (details.includes("iphone")) {
		return "SMARTPHONE";
	} else if (details.includes("ipad")) {
		return "TABLET";
	} else if (details.includes("windows")) {
		return "DESKTOP";
	} else if (details.includes("tablet")) {
		return "TABLET";
	} else if (details.includes("macintosh")) {
		return "DESKTOP";
	}
	return "SMARTPHONE";
}

export const DEVICE_TYPE: DeviceType = findDeviceType();
