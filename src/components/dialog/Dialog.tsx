import { useGlobalDialog } from "@/components/dialog/context";
import { AlertDialog, AlertDialogContent, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function GlobalDialog() {
	const { open, setOpen, content } = useGlobalDialog()

	const { t } = useTranslation()

	return (
		<AlertDialog open={open} onOpenChange={o => setOpen(o)}>
			{content &&
				<AlertDialogContent className={cn("p-6 gap-0 bg-background", content.ContainerCls)}>
					{content.disabledTitle ? null : <AlertDialogHeader className="font-bold text-xl pb-6">{content?.title}</AlertDialogHeader>}
					{content.content}
					{(!content.disabledCancel || !content.disabledOk) && <div className="flex items-center gap-2 pt-4">
						<div className="flex-1"></div>
						{content.disabledCancel ? null : (
							<Button variant="outline" onClick={() => {
								setOpen(false);
								content.onCancel?.()
							}}>
								{content.cancelText ? content.cancelText : t("Cancel")}
							</Button>)}
						{content.disabledOk ? null : (
							<Button onClick={content.onSubmit}>
								{content.okText ? content.okText : t("Ok")}
							</Button>)}
					</div>}
				</AlertDialogContent>}
		</AlertDialog>
	)
}