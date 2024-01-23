import {JSON_CONVERTER_NAME} from "@/modules/text/format-converter/consts";
import {useLocalState} from "@/hooks/state";
import {useEffect, useState} from "react";
import {Combobox} from "@/components/comobox/Combobox";
import {useModuleTranslation} from "@/modules/text/translation";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {formats} from "@/modules/text/format-converter/fomat";
import {ToolHeader} from "@/components/tool/ToolHeader";
import {CodeEditor} from "@/components/editor/CodeEditor";

export function FormatConverterPage() {
	const [text, setText] = useLocalState(JSON_CONVERTER_NAME + ".text", "")
	const [resText, setResText] = useState<string>("")
	const [fromFormat, setFromFormat] = useState<string>(formats[0].value)
	const [toFormat, setToFormat] = useState<string>(formats[1].value)
	const [direction, setDirection] = useState<"horizontal" | "vertical">("vertical")

	const {t} = useModuleTranslation()

	useEffect(() => {
		const ff = formats.find(f => f.value === fromFormat)
		const tf = formats.find(f => f.value === toFormat)
		if (ff && tf) {
			try {
				if (!text) return setResText("")
				const obj = ff.parse(text)
				setResText(tf.stringify(obj))
			} catch (e: any) {
				setResText(e.message)
			}
		}
	}, [text, toFormat, fromFormat])

	return <div className="flex flex-col gap-2 h-full">
		<ToolHeader>
			{t(JSON_CONVERTER_NAME)}
		</ToolHeader>
		<ResizablePanelGroup direction={direction} className="flex flex-1 gap-4">
			<ResizablePanel className="flex-1 flex flex-col ">
				<div className="flex items-center py-2">
					<span>{t("Input text")}:</span>
					<div className="flex-1"></div>
					<Combobox disableSearch width="unset" value={fromFormat} items={formats} onChange={v => setFromFormat(v)}/>
				</div>
				{/*<div className="flex-1 bg-red-50"></div>*/}
				<CodeEditor className="flex-1 bg-red-50" value={text} onChange={v => setText(v)}
				            language={fromFormat} options={{automaticLayout: true}}/>
			</ResizablePanel>
			<ResizableHandle withHandle/>
			<ResizablePanel className="flex-1 flex flex-col">
				<div className="flex items-center py-2">
					<span>{t("Result")}:</span>
					<div className="flex-1"></div>
					<Combobox width="unset" value={toFormat} items={formats} onChange={v => setToFormat(v)} disableSearch/>
				</div>
				<CodeEditor className="flex-1 bg-red-50" value={resText} onChange={v => setResText(resText)}
				            language={toFormat} options={{automaticLayout: true}}/>
			</ResizablePanel>
			{/*<div className="flex-1">*/}
			{/*	<span>{t("Result")}:</span>*/}
			{/*	<SimpleEditor/>*/}
			{/*</div>*/}
		</ResizablePanelGroup>
	</div>
}