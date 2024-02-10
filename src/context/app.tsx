import { createContext, type ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "./theme";
import { ModuleData, parseModules } from "@/core";
import { ToolGroupData } from "@/components/tool";
import { saveUserTools, UserToolStoreData } from "@/store/tool";
import { GlobalDialog, GlobalDialogProvider } from "@/components/dialog";

export type AppState = {
	modules: ModuleData[];
	userTools?: ToolGroupData[];
	setUserTools: (tg: ToolGroupData[]) => void
};

const initState: AppState = {
	modules: [],
	userTools: [],
	setUserTools: () => null
};

const AppProviderContext = createContext<AppState>(initState);


export const AppContextProvider = ({ children }: {
	children: ReactElement;
}) => {
	const modules = useMemo(() => parseModules(), []);
	const [userTools, setUserTools] = useState<ToolGroupData[]>()

	useEffect(() => {
		const data: UserToolStoreData[] = []
		if (userTools === undefined) {
			return
		}
		userTools.forEach(g => {
			data.push({
				name: g.name,
				tools: g.tools.map(tool => ({
					name: tool.name,
				}))
			})
		})
		saveUserTools(data)
	}, [userTools]);

	const value = {
		modules,
		userTools,
		setUserTools,
	};
	return (
		<AppProviderContext.Provider value={value}>
			<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
				<GlobalDialogProvider>
					{children}
					<GlobalDialog />
				</GlobalDialogProvider>
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
