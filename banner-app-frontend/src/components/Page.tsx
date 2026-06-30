import React from "react";

function Page({ children }: { children: React.ReactNode }) {
	return <section className="page">{children}</section>;
}

export default Page;
