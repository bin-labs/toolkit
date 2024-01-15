import {Tool} from "./tool";
import {ReactNode} from "react";

export type ModuleContext = {
	modules: IModule[],
}

export interface IModule {
	tools: Tool[];
	routes: ReactNode[]
	init?: (ctx: ModuleContext) => void
}

export type ModuleToolData = Tool & {
	module: string
}
export type ModuleData = Omit<IModule, "tools"> & {
	name: string
	tools: ModuleToolData[]
}

export function parseModules(): ModuleData[] {
	const modules = import.meta.glob("@/modules/*/index.tsx", {eager: true});

	const result: ModuleData[] = [];
	for (const path in modules) {
		const paths = path.split("/")
		const moduleName = paths[paths.length - 2]
		const data = (modules[path] as any).default as IModule;
		const module: any = {
			...data,
			...{
				name: moduleName,
				tools: data.tools.map(tool => ({...tool, ...{module: moduleName, id: moduleName + tool.name}}))
			}
		}
		result.push(module);
	}
	return result;
}

export type ModuleConfigure = (m: IModule) => void

export function createModule(...configures: ModuleConfigure[]): IModule {
	const res = {
		tools: [],
		routes: [],
		init: () => {
		}
	}
	configures.forEach(c => {
		c(res)
	})
	return res
}
