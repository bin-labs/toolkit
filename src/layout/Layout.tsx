import { ToolGroupData, UserToolGroup, UserToolItem } from "@/components/tool";
import { useAllTools } from "@/hooks/tool";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useApp } from "@/context";
import { DataMenu, MenuItemData } from "@/components/data-menu";
import { TooGroupDialogValue, UserToolGroupDialog } from "@/components/tool/UserToolGroupDialog";
import { getUserTools } from "@/store/tool";
import { useCurrent } from "@/lib/module";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "lucide-react";
import { useSettings } from "@/pages/settings/hook";
import { Separator } from "@/components/ui/separator";


export function Layout() {
	const { userTools, setUserTools } = useApp()
	const [groupDialogValue, setGroupDialogValue] = useState<TooGroupDialogValue>()

	const allTools = useAllTools();
	const { t } = useTranslation();
	const current = useCurrent()

	const { showSettings } = useSettings()

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
		setGroupDialogValue({ open: true, group: g })
	}

	const initUserTools = async () => {
		const tg = await getUserTools();
		const data: ToolGroupData[] = [];
		tg?.forEach((g) => {
			const tools = g.tools
				.filter((tool) => allTools[tool.name] !== undefined)
				.map((tool) => {
					return { ...allTools[tool.name], ...{ group: g.name } };
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
			<div className="bg-secondary h-full flex flex-col">
				<DataMenu items={menuItems} classname="flex-1 overflow-auto">
					<div className="py-2 w-[280px]">
						<UserToolItem selectedTool={current} className="px-4" name="all" menuDisabled={true} group="all" module="" />
						{userTools.map((g) => (
							<UserToolGroup key={g.name} {...g} onEdit={g => openGroupDialog(g)} selectedTool={current} />
						))}
					</div>
				</DataMenu>
				<Separator orientation="horizontal" />
				<div className="flex items-center">
					<Button variant="secondary" className="bg-transparent p-0" size="icon" onClick={() => showSettings()}>
						<SettingsIcon className="h-5 w-5" />
					</Button>
					<div className="flex-1"></div>
					<span className="px-1 text-gray-400">v0.0.1-alpha</span>
				</div>
				<UserToolGroupDialog data={groupDialogValue} />
			</div>
			<div className="flex-1 p-4 overflow-auto">
				<Outlet />
			</div>
		</div>
	);
}
