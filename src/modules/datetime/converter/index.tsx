import {IModule} from "@/core";
import {TimestampConverter} from "@/modules/datetime/converter/TimestampConverter";

export const converter = "dt.converter"

export function addConverters(m: IModule) {
	m.tools.push({
		name: converter,
		description: "this is a description",
		tags: ["converter"],
	})
	m.routes.push({
		path: converter,
		element: <TimestampConverter/>
	})
}