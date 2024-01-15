import {ToolGroupData, UserToolGroup, UserToolItem} from "@/components/tool";
import {useAllTools} from "@/hooks/tool";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Outlet, useNavigate} from "react-router-dom";
import {Tools} from "wails/go/settings/Settings";
import {useApp} from "@/context";
import {DataMenu, MenuItemData} from "@/components/data-menu";
import {TooGroupDialogValue, UserToolGroupDialog} from "@/components/tool/UserToolGroupDialog";


export function Layout() {
	const {userTools, setUserTools} = useApp()
	const [groupDialogValue, setGroupDialogValue] = useState<TooGroupDialogValue>()

	const allTools = useAllTools();
	const {t} = useTranslation();
	const navigate = useNavigate()

	const menuItems: MenuItemData[] = [
		{
			key: "create group",
			content: "Create a group",
			onClick: e => {
				openGroupDialog()
			}
		}
	]

	const openGroupDialog = (g?: ToolGroupData) => {
		setGroupDialogValue({open: true, group: g})
	}

	const initUserTools = async () => {
		const tg = await Tools();
		const data: ToolGroupData[] = [];
		tg.forEach((g) => {
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
			<DataMenu items={menuItems}>
				<div className="w-[300px] p-4 overflow-auto">
					<UserToolItem className="px-2" name="All tools" menuDisabled={true} group="all" module=""
					              url="/all"
					              displayName={t("All tools")}/>
					{userTools.map((g) => (
						<UserToolGroup key={g.name} {...g} onEdit={g => openGroupDialog(g)}/>
					))}
				</div>
			</DataMenu>
			<UserToolGroupDialog data={groupDialogValue}/>
			<div className="flex-1 p-2 overflow-auto">
				<Outlet/>
			</div>
		</div>
	);
}
