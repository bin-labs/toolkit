import {Tool} from "./tool";
import {RouteObject} from "react-router-dom";

export type ModuleContext = {
	modules: IModule[],
}

export interface IModule {
	tools: Tool[];
	routes: RouteObject[]
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
	const modules = import.meta.glob("@/modules/*/index.tsx", {import: "default", eager: true});

	const result: ModuleData[] = [];
	for (const path in modules) {
		const paths = path.split("/")
		const moduleName = paths[paths.length - 2]
		const data = modules[path] as IModule;
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
