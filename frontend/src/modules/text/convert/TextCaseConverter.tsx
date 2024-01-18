import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {textConverter} from "@/modules/text/convert/index";
import {useModuleTranslation} from "@/modules/text/translation";
import {useLocalState} from "@/hooks/state";
import {useCurrent} from "@/lib/module";

export function TextCaseConverter() {
	const current = useCurrent()

	const [text, setText] = useLocalState(textConverter + current?.group + ".text", "")
	const [resText, setResText] = useState<string>("")

	const {t} = useModuleTranslation()

	const toLowerCase = () => {
		setResText(text.toLowerCase())
	}

	const toUpperCase = () => {
		setResText(text.toUpperCase())
	}

	return (
		<div className="flex flex-col gap-2 h-full">
			<div>{t(textConverter)}</div>
			<div>{t("Input text")}:</div>
			<Textarea className="flex-1" rows={10} defaultValue={text} onChange={(e) => setText(e.target.value)}></Textarea>
			<div className="flex flex-wrap gap-2">
				<Button variant="secondary" onClick={toLowerCase}>{t("lower case")}</Button>
				<Button variant="secondary" onClick={toUpperCase}>{t("UPPER CASE")}</Button>
			</div>

			<div className="pt-4">{t("Result")}:</div>
			< Textarea defaultValue={resText} rows={10} readOnly={true}
			           className="flex-[1] border-2 p-2 rounded-sm"></Textarea>
		</div>
	)
}