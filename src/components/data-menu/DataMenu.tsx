import React, { MouseEvent, ReactNode } from "react";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";

export type DataMenuProps = {
	children: ReactNode
	disabled?: boolean
	classname?: string
	items?: MenuItemData[]
}

export type MenuItemData = {
	key: string
	content: ReactNode
	disabled?: boolean
	children?: MenuItemData[]
	onClick?: (item: MenuItemData, e: MouseEvent<HTMLDivElement>) => void;
}

function DataMenuItem(props: MenuItemData) {
	return props.children ? (
		<ContextMenuSub>
			<ContextMenuSubTrigger disabled>
				{props.content}
			</ContextMenuSubTrigger>
			<ContextMenuSubContent>
				{props.children.map(child => (<DataMenuItem {...child} />))}
			</ContextMenuSubContent>
		</ContextMenuSub>) : (
		<ContextMenuItem disabled={props.disabled} onClick={e => props.onClick?.(props, e)}>
			{props.content}
		</ContextMenuItem>
	)
}

export function DataMenu(props: DataMenuProps) {
	if (!props.disabled && (!props.items || props.items.length == 0)) {
		return props.children
	}
	return (
		<ContextMenu >
			<ContextMenuTrigger className={cn(props.classname)}>
				{props.children}
			</ContextMenuTrigger>
			{props.disabled ? null : (
				<ContextMenuContent>
					{props.items?.map(item => (<DataMenuItem {...item} />))}
				</ContextMenuContent>)
			}
		</ContextMenu>
	)
}