import {Dialog, DialogContent, DialogFooter, DialogHeader} from "@/components/ui/dialog";
import {useGlobalDialog} from "@/components/dialog/context";

export function GlobalDialog() {
	const {open, setOpen, content} = useGlobalDialog()
	return (
		<Dialog open={open} onOpenChange={o => setOpen(o)}>
			<DialogContent>
				<DialogHeader>{content?.title}</DialogHeader>
				{content?.content}
			</DialogContent>
			<DialogFooter>
				{content?.footer}
			</DialogFooter>
		</Dialog>
	)
}