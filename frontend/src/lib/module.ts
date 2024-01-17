import {IModule, Tool} from "@/core";
import {ReactNode} from "react";

export function addTools(m: IModule, ...tools: (Tool & { element: ReactNode })[]) {
	tools.forEach(tool => {
		m.tools.push(tool)
		if (tool.element) {
			m.routes.push({
				path: tool.name,
				element: tool.element
			})
		}
	})
}