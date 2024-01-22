import {useEffect, useRef, useState} from "react";
import * as monaco from "monaco-editor";
import {cn} from "@/lib/utils";

export type SimpleEditorProps = {
	value?: string
	theme?: string
	language?: string
	onChange?: (value: string) => void
	className?: string
	readonly?: boolean
}

export function SimpleEditor(props: SimpleEditorProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
	const __prevent_trigger_change_event = useRef(false);
	useEffect(() => {
		if (!containerRef.current) return
		console.log("SimpleEditor.....")
		const dt = monaco.editor.create(containerRef.current!, {
			value: props.value,
			language: props.language,
			theme: props.theme || "vs-dark",
			automaticLayout: true,
			smoothScrolling: true,
			contextmenu: false,
			readOnly: props.readonly,
		});
		dt.onDidChangeModelContent((e) => {
			props.onChange?.(dt.getValue())
		})
		setEditor(dt);
		return () => {
			dt?.dispose()
		}
	}, [containerRef.current]);

	console.log("render value: ", props.value)

	useEffect(() => {
		if (editor) {
			if (props.value === editor.getValue()) {
				return;
			}
			console.log("SimpleEditor update value", props.value)
			const model = editor.getModel();
			__prevent_trigger_change_event.current = true;
			editor.pushUndoStop();
			// pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
			model?.pushEditOperations(
				[],
				[
					{
						range: model.getFullModelRange(),
						text: props.value ?? "",
					},
				],
				() => null,
			);
			editor.pushUndoStop();
			__prevent_trigger_change_event.current = false;
		}
	}, [props.value]);


	useEffect(() => {
		editor?.updateOptions({readOnly: props.readonly})
	}, [props.readonly])

	useEffect(() => {
		editor?.updateOptions({theme: props.theme})
	}, [props.theme])

	useEffect(() => {
		const model = editor?.getModel()
		if (model) {
			monaco.editor.setModelLanguage(model, props.language || "")
		}
	}, [props.language])

	return (
		<div ref={containerRef} className={cn(props.className)}>

		</div>
	)
}