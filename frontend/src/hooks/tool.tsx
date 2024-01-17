import {useApp} from "@/context";
import {ModuleToolData} from "@/core";
import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useLocation, useSearchParams} from "react-router-dom";

export function useAllTools() {
	const {modules} = useApp();
	const {t} = useTranslation()
	return useMemo(() => {
		const result: {
			[key: string]: ModuleToolData
		} = {};
		modules.forEach((m) => {
			m.tools.forEach((tool) => {
				if (result[tool.name] !== undefined) {
					throw new Error(`Duplicate tool name: ${tool.name}`);
				}
				result[tool.name] = {
					...tool,
					...{
						module: m.name,
					}
				}
				;
			});
		});
		return result;
	}, [modules]);
}


export function useToolGroups() {
	const {userTools} = useApp()
	return useMemo(() => {
		return userTools.map(tg => tg.name)
	}, [userTools])
}

export function useRemoveToolFromGroup() {
	const {userTools, setUserTools} = useApp()

	return (toolName: string, groupName: string) => {
		const g = userTools.find(g => g.name === groupName)
		if (g) {
			g.tools = g.tools.filter(tool => tool.name !== toolName)
			setUserTools([...userTools])
		}
	}
}

export function useDeleteGroup() {
	const {userTools, setUserTools} = useApp()
	return (groupName: string) => {
		setUserTools(userTools.filter(g => g.name !== groupName))
	}
}

export type CurrentUserTool = {
	toolName: string
	group: string | null
}

export function useCurrent() {
	const [current, setCurrent] = useState<CurrentUserTool>()

	const location = useLocation()
	const [query] = useSearchParams()

	useEffect(() => {
		if (location.pathname.startsWith("/tool/")) {
			const paths = location.pathname.split("/")
			const tn = paths[2]
			const g = query.get("group")
			if (tn) {
				setCurrent({
					toolName: tn,
					group: g,
				})
			}
		}
	}, [location.pathname, query]);

	return current
}