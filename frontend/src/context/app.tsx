import {createContext, type ReactElement, useContext, useEffect, useMemo, useState} from "react";
import {ThemeProvider} from "./theme";
import {ModuleData, parseModules} from "@/core";
import {ToolGroupData} from "@/components/tool";
import {SaveTools} from "wails/go/settings/Settings";
import {settings} from "wails/go/models";

export type AppState = {
	modules: ModuleData[];
	userTools: ToolGroupData[];
	setUserTools: (tg: ToolGroupData[]) => void
};

const initState: AppState = {
	modules: [],
	userTools: [],
	setUserTools: () => null
};

const AppProviderContext = createContext<AppState>(initState);

export const AppContextProvider = ({children,}: {
	children: ReactElement;
}) => {
	const modules = useMemo(() => parseModules(), []);
	const [userTools, setUserTools] = useState<ToolGroupData[]>([])

	useEffect(() => {
		if (!userTools || userTools.length === 0) {
			return
		}
		const data: settings.ToolGroup[] = []
		userTools.forEach(g => {
			data.push(new settings.ToolGroup({
				name: g.name,
				tools: g.tools.map(tool => ({
					name: tool.name,
				}))
			}))
		})
		SaveTools(data)
	}, [userTools]);

	const value = {
		modules,
		userTools,
		setUserTools,
	};
	return (
		<AppProviderContext.Provider value={value}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				{children}
			</ThemeProvider>
		</AppProviderContext.Provider>
	);
};

export function useApp() {
	const ctx = useContext(AppProviderContext);
	if (ctx === undefined) {
		throw new Error("useApp must be used within a AppProviderContext");
	}
	return ctx;
}
