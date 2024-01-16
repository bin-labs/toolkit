import {IModule} from "@/core";
import {TextCaseConverter} from "@/modules/text/convert/TextCaseConverter";
import React from "react";
import {PinyinConverter} from "@/modules/text/convert/PinyinConverter";

export const textConverter = "text.converter";
export const pinyinConverter = "text.pinyin";

export function addConverters(m: IModule) {
	m.tools.push(
		{
			name: textConverter,
			description: "this is a description",
			tags: ["converter"],
		},
		{
			name: pinyinConverter,
			description: "convert text to pinyin",
			tags: ["converter", "pinyin"],
		},
	)
	m.routes.push(
		{
			path: textConverter,
			element: <TextCaseConverter/>,
		},
		{
			path: pinyinConverter,
			element: <PinyinConverter/>,
		}
	)
}