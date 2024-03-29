import React from "react";

export type Tool = {
	name: string;
	description?: string,
	icon?: React.ReactNode;
	tags?: string[];
	url?: string;
	onClick?: (t: Tool) => void;
};
