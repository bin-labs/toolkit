import {createBrowserRouter, RouteObject, RouterProvider} from "react-router-dom";
import {ModuleData} from "@/core";
import {useApp} from "@/context";
import {Layout} from "@/layout";
import {Home} from "@/pages/tool";
import {AllTools} from "@/pages/tool/AllTools";

function RootRoute(modules: ModuleData[]): RouteObject[] {
	const parseRoutes = (ms: ModuleData[]) => {
		return ms.map(m => (
			{
				path: m.name,
				children: m.routes,
			}
		))
	}

	return [
		{
			element: <Layout/>,
			children: [
				{
					path: "",
					element: (<Home/>),
				},
				{
					path: "all",
					element: (<AllTools/>),
				},
				...parseRoutes(modules)]
		}
	]
}

export function Root() {
	const {modules} = useApp()
	const router = createBrowserRouter(RootRoute(modules))
	return <RouterProvider router={router}/>
}