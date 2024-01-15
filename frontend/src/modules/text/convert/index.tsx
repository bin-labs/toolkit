import {IModule} from "@/core";
import {TextCaseConverter} from "@/modules/text/convert/TextCaseConverter";
import {Route} from "react-router-dom";
import React from "react";

export const textConverter = "text.converter"

export function addConverters(m: IModule) {
	m.tools.push({
		name: textConverter,
		description: "this is a description",
		tags: ["converter"],
	})
	m.routes.push(
		<Route path={textConverter} element={<TextCaseConverter/>}/>
	)
}