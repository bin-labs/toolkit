import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import pinyin from "pinyin/lib/pinyin-web";
import {pinyinConverter} from "@/modules/text/convert";
import {useModuleTranslation} from "@/modules/text/translation";

export function PinyinConverter() {
	const [text, setText] = useState<string>("")
	const [resText, setResText] = useState<string>("")

	const {t} = useModuleTranslation()

	const toPinyin = () => {
		const pText = pinyin(text)
		setResText(pText.join(" "))
	}

	useEffect(() => {
		toPinyin()
	}, [text]);

	return (
		<div className="flex flex-col gap-2 h-full">
			<div>{t(pinyinConverter)}</div>
			<div>{t("Input text")}:</div>
			<Textarea className="flex-1 text-lg" rows={10} defaultValue={text}
			          onChange={(e) => setText(e.target.value)}></Textarea>
			<div className="flex flex-wrap gap-2">
				<Button variant="secondary" onClick={toPinyin}>{t("Convert")}</Button>
			</div>

			<div className="pt-4 ">{t("Result")}:</div>
			<Textarea defaultValue={resText} rows={10} readOnly={true}
			          className="flex-[1] text-lg border-2 p-2 rounded-sm"></Textarea>
		</div>)
}