import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import React, {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils";
import {DataMenu, MenuItemData} from "@/components/data-menu";
import {CurrentUserTool, useDeleteGroup, useRemoveToolFromGroup} from "@/hooks/tool";
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
	selectedTool?: CurrentUserTool
}

export function useGoTool() {
	const navigate = useNavigate();
	return (tool: Partial<UserTool>) => {
		let url = tool.url
		if (!url) {
			url = `/tool/${tool.name}?group=${tool.group}`
		}
		navigate(url);
	}
}

export function UserToolItem(props: ToolItemProps) {
	const removeTool = useRemoveToolFromGroup()
	const goTool = useGoTool()

	const {t} = useTranslation()

	const selectedClassName = useMemo(() => {
		if (props.selectedTool && props.selectedTool.toolName === props.name && props.selectedTool.group === props.group) {
			return "bg-primary text-primary-foreground"
		}
		return "hover:bg-accent hover:text-accent-foreground"
	}, [props.selectedTool])

	const items: MenuItemData[] = [
		{
			content: t("Open in a new window"),
			key: "open",
			disabled: true,
		},
		{
			content: t("Delete"),
			key: "delete",
			onClick: () => removeTool(props.name, props.group)
		}
	]

	return (
		<DataMenu items={items} disabled={props.menuDisabled}>
			<div
				className={cn("px-6 py-2 cursor-default flex items-center gap-1", selectedClassName, props.className)}
				onClick={() => props.onClick ? props.onClick(props) : goTool(props)}
			>
				{props.icon}
				{t(props.name, {ns: props.module})}
			</div>
		</DataMenu>
	);
}


export type UserToolGroupProps = ToolGroupData & {
	selectedTool?: CurrentUserTool
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
				open={open}
				onOpenChange={(o) => setOpen(o)}
			>
				<CollapsibleTrigger asChild>
					<div
						className="flex py-2 items-center px-4 cursor-default hover:bg-accent hover:text-accent-foreground"
						onClick={() => props.onClick?.(props) || goto(props.url)}
					>
						<span className="flex-1 font-bold">{props.name}</span>
						{open ? (
							<ChevronUpIcon className="h-4 w-4"/>
						) : (
							<ChevronDownIcon className="h-4 w-4"/>
						)}
					</div>
				</CollapsibleTrigger>
				<CollapsibleContent className="flex flex-col">
					{props.tools.map((t) => (
						<UserToolItem key={t.name} {...t} selectedTool={props.selectedTool}/>
					))}
				</CollapsibleContent>
			</Collapsible>
		</DataMenu>
	);
}
