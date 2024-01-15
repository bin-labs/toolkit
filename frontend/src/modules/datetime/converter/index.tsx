import {IModule} from "@/core";
import {TimestampConverter} from "@/modules/datetime/converter/TimestampConverter";
import {Route} from "react-router-dom";

export const converter = "dt.converter"

export function addConverters(m: IModule) {
	m.tools.push({
		name: converter,
		description: "this is a description",
		tags: ["converter"],
	})
	m.routes.push(<Route path={converter} element={<TimestampConverter/>}/>)
}