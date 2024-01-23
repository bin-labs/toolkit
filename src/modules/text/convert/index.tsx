import {TextCaseConverter} from "@/modules/text/convert/TextCaseConverter";
import React from "react";
import {PinyinConverter} from "@/modules/text/convert/PinyinConverter";
import {CountdownTimerIcon, ReaderIcon} from "@radix-ui/react-icons";

export const textConverter = "text.converter";
export const pinyinConverter = "text.pinyin";

export function getConverters() {
	return [
		{
			name: textConverter,
			description: "this is a description",
			tags: ["converter"],
			element: <TextCaseConverter/>,
			icon: <ReaderIcon width={16} height={16}/>
		},
		{
			name: pinyinConverter,
			description: "convert text to pinyin",
			tags: ["converter", "pinyin"],
			element: <PinyinConverter/>,
			icon: <CountdownTimerIcon width={16} height={16}/>
		}
	]
}