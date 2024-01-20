import {createContext, ReactNode, useContext, useState} from "react";

export type GlobalDialogData = {
	title: string
	content?: ReactNode
	disabledOk?: boolean
	disabledCancel?: boolean
	okText?: string
	cancelText?: string
	onSubmit?: () => void | Promise<void>
	onCancel?: () => void | Promise<void>
}

export type GlobalDialogState = {
	open: boolean
	setOpen: (open: boolean) => void
	content?: GlobalDialogData
	setContent: (data: GlobalDialogData) => void
}

const initState: GlobalDialogState = {
	open: false,
	setOpen: () => null,
	setContent: () => null,
}

const GlobalDialogContext = createContext<GlobalDialogState>(initState);


export function GlobalDialogProvider(props: {
	children: ReactNode
}) {
	const [open, setOpen] = useState(false)
	const [content, setContent] = useState<GlobalDialogData>()

	const value = {
		open,
		setOpen,
		content,
		setContent,
	}

	return <GlobalDialogContext.Provider value={value}>
		{props.children}
	</GlobalDialogContext.Provider>
}


export function useGlobalDialog() {
	const ctx = useContext(GlobalDialogContext)
	const close = () => {
		ctx.setOpen(false)
	}

	const show = (data: GlobalDialogData) => {
		ctx.setContent(data)
		ctx.setOpen(true)
	}

	const showError = (data: GlobalDialogData) => {
		ctx.setContent({
			...data,
			disabledCancel: true,
			onSubmit: () => ctx.setOpen(false),
		})
		ctx.setOpen(true)
	}

	return {
		...ctx,
		close,
		show,
		showError,
	}
}