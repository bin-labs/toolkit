import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import React from "react";
import {useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils";
import {DataMenu, MenuItemData} from "@/components/data-menu";
import {useDeleteGroup, useRemoveToolFromGroup} from "@/hooks/tool";
import {useTranslation} from "react-i18next";
import {ModuleToolData} from "@/core";

export type UserTool = ModuleToolData & {
	group: string
}

export type ToolGroupData = {
	name: string;
	tools: UserTool[];
	url?: string;
	onClick?: (t: ToolGroupData) => void;
};

export type ToolItemProps = UserTool & {
	className?: string
	menuDisabled?: boolean
}

export function useGoTool() {
	const navigate = useNavigate();
	return (tool: ModuleToolData) => {
		let url = tool.url
		if (!url) {
			url = `/${tool.module}/${tool.name}`
		}
		console.log(url)
		navigate(url);
	}
}

export function UserToolItem(props: ToolItemProps) {
	const removeTool = useRemoveToolFromGroup()
	const goTool = useGoTool()

	const items: MenuItemData[] = [
		{
			content: "Open in a new window",
			key: "open",
			disabled: true,
		},
		{
			content: "Delete",
			key: "delete",
			onClick: () => removeTool(props.name, props.group)
		}
	]

	return (
		<DataMenu items={items} disabled={props.menuDisabled}>
			<div
				className={cn("px-4 py-1 cursor-default hover:bg-slate-400", props.className)}
				onClick={() => props.onClick ? props.onClick(props) : goTool(props)}
			>
				{props.displayName ?? props.name}
			</div>
		</DataMenu>
	);
}


export type UserToolGroupProps = ToolGroupData & {
	onEdit?: (g: ToolGroupData) => void
}

export function UserToolGroup(props: UserToolGroupProps) {
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();
	const {t} = useTranslation()
	const deleteGroup = useDeleteGroup()
	const goto = (url?: string) => {
		if (url) {
			navigate(url);
		}
	};

	const items: MenuItemData[] = [
		{
			key: "rename",
			content: t("Rename"),
			onClick: item => {
				props.onEdit?.(props)
			}
		},
		{
			key: "delete",
			content: t("Delete"),
			onClick: () => {
				deleteGroup(props.name)
			}
		},
	]
	return (
		<DataMenu items={items}>
			<Collapsible
				className="space-y-2"
				open={open}
				onOpenChange={(o) => setOpen(o)}
			>
				<CollapsibleTrigger asChild>
					<div
						className="flex items-center px-2 py-1 cursor-default hover:bg-slate-400"
						onClick={() => props.onClick?.(props) || goto(props.url)}
					>
						<span className="flex-1">{props.name}</span>
						{open ? (
							<ChevronUpIcon className="h-4 w-4"/>
						) : (
							<ChevronDownIcon className="h-4 w-4"/>
						)}
					</div>
				</CollapsibleTrigger>
				<CollapsibleContent className="space-y-2 flex flex-col">
					{props.tools.map((t) => (
						<UserToolItem key={t.name} {...t} />
					))}
				</CollapsibleContent>
			</Collapsible>
		</DataMenu>
	);
}
