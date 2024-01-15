import {useAllTools} from "@/hooks/tool";
import {Card,} from "@/components/ui/card"
import {useTranslation} from "react-i18next";
import {Badge} from "@/components/ui/badge";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {useApp} from "@/context";
import {ToolGroupData, useGoTool} from "@/components/tool";
import {ModuleToolData} from "@/core";

export function AllTools() {
	const tools = useAllTools()
	const {userTools, setUserTools} = useApp()
	const {t} = useTranslation()
	const go = useGoTool()

	const addToolToGroup = (tool: ModuleToolData, group: ToolGroupData) => {
		if (group.tools.findIndex(tt => tt.name === tool.name) < 0) {
			group.tools.push({
				...tool,
				...{
					group: group.name
				}
			})
			setUserTools([...userTools])
		}
	}

	return (<div>
		<h1 className="text-2xl py-4">{t("All tools")}</h1>
		<div className="flex flex-wrap gap-2">
			{Object.values(tools).map(tool => (
				<ContextMenu>
					<ContextMenuTrigger>
						<Card className="p-4 flex flex-col gap-4 max-w-[400px] cursor-default"
						      onClick={() => go(tool)}>
							<div className="flex items-center">
								{tool.icon ? <div className="w-[24px] h-[24px]">{tool.icon}</div> : null}
								<div className="font-bold">{tool.displayName}</div>
							</div>
							<p className="flex-1">{tool.description}</p>
							<div>
								{tool.tags?.map(tag => (
									<Badge key={tag}>{tag}</Badge>
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
								{userTools.map(g => (
									<ContextMenuItem key={g.name} onClick={() => addToolToGroup(tool, g)}>{g.name}</ContextMenuItem>))}
							</ContextMenuSubContent>
						</ContextMenuSub>
					</ContextMenuContent>
				</ContextMenu>
			))}
		</div>
	</div>)
}