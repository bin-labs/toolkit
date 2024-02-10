import { useAllTools } from "@/hooks/tool";
import { Card, } from "@/components/ui/card"
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useApp } from "@/context";
import { ToolGroupData, useGoTool } from "@/components/tool";
import { ModuleToolData } from "@/core";

export function AllTools() {
	const tools = useAllTools()
	const { userTools, setUserTools } = useApp()
	const { t } = useTranslation()
	const go = useGoTool()

	const addToolToGroup = (tool: ModuleToolData, group: ToolGroupData) => {
		if (group.tools.findIndex(tt => tt.name === tool.name) < 0) {
			group.tools.push({
				...tool,
				...{
					group: group.name
				}
			})
			setUserTools([...userTools ?? []])
		}
	}

	return (<div>
		<h1 className="text-2xl pb-4">{t("all")}</h1>
		<div className="grid grid-cols-[repeat(auto-fill,minmax(200px,2fr))] gap-2">
			{Object.values(tools).map(tool => (
				<ContextMenu key={tool.name}>
					<ContextMenuTrigger>
						<Card className="p-4 flex flex-col h-full gap-4 cursor-default"
							onClick={() => go(tool)}>
							<div className="flex items-center gap-1">
								{tool.icon}
								<div className="font-bold">{t(tool.name, { ns: tool.module })}</div>
							</div>
							<p className="flex-1 text-sm text-secondary-foreground">{t(tool.description ?? "", { ns: tool.module })}</p>
							<div className="flex flex-wrap gap-2">
								{tool.tags?.map(tag => (
									<Badge key={tag}>{t(tag)}</Badge>
								))}
							</div>
						</Card>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem>{t("Open in a new window")}</ContextMenuItem>
						<ContextMenuItem>{t("Add to favorites")}</ContextMenuItem>
						<ContextMenuSub>
							<ContextMenuSubTrigger>{t("Add to group")}</ContextMenuSubTrigger>
							<ContextMenuSubContent>
								{userTools?.map(g => (
									<ContextMenuItem key={g.name} onClick={() => addToolToGroup(tool, g)}>{g.name}</ContextMenuItem>))}
							</ContextMenuSubContent>
						</ContextMenuSub>
					</ContextMenuContent>
				</ContextMenu>
			))}
		</div>
	</div>)
}