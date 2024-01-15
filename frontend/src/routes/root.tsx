import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import {Layout} from "@/layout";
import {Home} from "@/pages/tool";
import {AllTools} from "@/pages/tool/AllTools";
import {ModuleData} from "@/core";
import {useApp} from "@/context";

function RootRoute(modules: ModuleData[]) {
	const parseRoutes = (ms: ModuleData[]) => {
		return ms.map(m => (
			<Route path={m.name}>
				{m.routes}
			</Route>
		))
	}

	return (
		<Routes>
			<Route element={<Layout/>}>
				<Route path="all" element={<AllTools/>}/>
				{parseRoutes(modules)}
				<Route path="" element={<Home/>}/>
				{/* <Route path="404" element={<NotFound />} /> */}
			</Route>
		</Routes>
	)
}


export function Root() {
	const {modules} = useApp()
	const router = createBrowserRouter([{path: '*', element: RootRoute(modules)}])
	return <RouterProvider router={router}/>
}