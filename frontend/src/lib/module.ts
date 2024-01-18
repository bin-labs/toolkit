import {IModule, Tool} from "@/core";
import {ReactNode, useMemo} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import {CurrentUserTool} from "@/hooks/tool";

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

export function useCurrent() {
	const location = useLocation()
	const [query] = useSearchParams()

	const current: CurrentUserTool | undefined = useMemo(() => {
		if (location.pathname.startsWith("/tool/")) {
			const paths = location.pathname.split("/")
			const toolName = paths[2]
			const group = query.get("group")
			if (toolName) {
				return {toolName, group}
			} else {
				return
			}
		}
	}, [location.pathname, query])
	return current
}