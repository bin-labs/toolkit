import {useApp} from "@/context";
import {ModuleToolData} from "@/core";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";

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
						displayName: t(tool.name, {ns: m.name}),
						description: tool.description ? t(tool.description, {ns: m.name}) : ""
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