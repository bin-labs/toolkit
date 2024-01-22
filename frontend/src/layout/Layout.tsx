import {ToolGroupData, UserToolGroup, UserToolItem} from "@/components/tool";
import {useAllTools} from "@/hooks/tool";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Outlet, useNavigate} from "react-router-dom";
import {useApp} from "@/context";
import {DataMenu, MenuItemData} from "@/components/data-menu";
import {TooGroupDialogValue, UserToolGroupDialog} from "@/components/tool/UserToolGroupDialog";
import {getUserTools} from "@/store/tool";
import {useCurrent} from "@/lib/module";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";


export function Layout() {
	const {userTools, setUserTools} = useApp()
	const [groupDialogValue, setGroupDialogValue] = useState<TooGroupDialogValue>()

	const allTools = useAllTools();
	const {t} = useTranslation();
	const navigate = useNavigate()
	const current = useCurrent()

	const menuItems: MenuItemData[] = [
		{
			key: "create group",
			content: t("Create group"),
			onClick: e => {
				openGroupDialog()
			}
		}
	]

	const openGroupDialog = (g?: ToolGroupData) => {
		setGroupDialogValue({open: true, group: g})
	}

	const initUserTools = async () => {
		const tg = await getUserTools();
		const data: ToolGroupData[] = [];
		tg?.forEach((g) => {
			const tools = g.tools
				.filter((tool) => allTools[tool.name] !== undefined)
				.map((tool) => {
					return {...allTools[tool.name], ...{group: g.name}};
				});
			data.push({
				name: g.name,
				tools,
			});
		});
		setUserTools(data);
	};

	useEffect(() => {
		initUserTools();
	}, []);

	return (
		<div className="flex w-full h-full">
			<div>
				<DataMenu items={menuItems}>
					<div className="overflow-auto h-full bg-secondary py-2 w-[280px]">
						<UserToolItem selectedTool={current} className="px-4" name="all" menuDisabled={true} group="all" module=""/>
						{userTools.map((g) => (
							<UserToolGroup key={g.name} {...g} onEdit={g => openGroupDialog(g)} selectedTool={current}/>
						))}
					</div>
				</DataMenu>
				<UserToolGroupDialog data={groupDialogValue}/>
			</div>
			<div className="flex-1 p-4 overflow-auto">
				<Outlet/>
			</div>
		</div>
	);
}
