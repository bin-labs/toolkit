import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolGroupData } from "@/components/tool/Tool";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "@/context";

export type TooGroupDialogValue = {
	open: boolean
	group?: ToolGroupData
}

export type UserToolGroupDialogProps = {
	data?: TooGroupDialogValue
}

export function UserToolGroupDialog({ data }: UserToolGroupDialogProps) {

	const { t } = useTranslation()
	const { userTools, setUserTools } = useApp()

	const [open, setOpen] = useState(false)
	const [group, setGroup] = useState<ToolGroupData>({ name: "", tools: [] })

	const submit = () => {
		if (userTools === undefined) {
			return
		}
		if (!data?.group) {
			if (group && userTools.findIndex(g => g.name === group.name) < 0) {
				setUserTools([...userTools, group])
			}
		} else {
			if (data.group.name === group.name) {
				return "group name exits"
			}
			const index = userTools.findIndex(g => g.name === group.name)
			if (index >= 0) {
				return "group name exits"
			}
			setUserTools(userTools.map(g => g.name === data.group?.name ? group : g))
		}
		setOpen(false)
	}

	useEffect(() => {
		if (data?.group) {
			setGroup(data.group)
		} else {
			setGroup({ name: "", tools: [] })
		}
		setOpen(data?.open ?? false)
	}, [data]);

	return (
		<Dialog open={open} defaultOpen={false}
			modal={true}
			onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("Create group")}</DialogTitle>
				</DialogHeader>
				<div className="flex items-center gap-4">
					<span>{t("Group name")}: </span>
					<Input className="flex-1" placeholder={t("Input group name")} value={group.name}
						onChange={(e) => setGroup({ ...group, ...{ name: e.target.value } })} />
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setOpen(false)}>{t("Cancel")}</Button>
					<Button disabled={group.name === ""}
						onClick={() => submit()}>{t("Ok")}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}