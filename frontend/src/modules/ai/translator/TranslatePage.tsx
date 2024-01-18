import {useTranslation} from "react-i18next";
import {TRANSLATOR_NAME} from "@/modules/ai/translator/tool";
import {MODULE_NAME} from "@/modules/ai/consts";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {useGlobalDialog} from "@/components/dialog";
import {ModelSelect} from "@/modules/ai/translator/ModelSelect";
import {Loader2, SettingsIcon} from "lucide-react";
import translator, {Language} from "@/modules/ai/translator/providers";

export function TranslatePage() {
	const [text, setText] = useState<string>("")
	const [resText, setResText] = useState<string>("")
	const [providers, setProviders] = useState(translator.getProviders())
	const items = providers.map(p => ({label: p.label, value: p.name}))
	const [provider, setProvider] = useState<string>(items[0]?.value ?? "")
	const [langs, setLangs] = useState<Language[]>([])
	const [to, setTo] = useState("")
	const [loading, setLoading] = useState(false)

	const {t} = useTranslation(MODULE_NAME)
	const {show} = useGlobalDialog()

	const handleTranslate = async () => {
		setLoading(true)
		try {
			const res = await translator.translate(provider, {
				text: text,
				to: to,
				callback: (text) => {
					setResText(text)
				}
			})
			setResText(res)
		} finally {
			setLoading(false)
		}
	}

	const handleSettings = () => {
		show({
			title: "test",
			content: "test content"
		})
	}

	useEffect(() => {
		if (provider) {
			translator.getLanguages(provider).then(res => {
				setLangs(res.items)
				setTo(res.defaultValue)
			})
		} else {
			setLangs([])
		}
	}, [provider])

	return (<div className="flex flex-col gap-2 h-full">
		<div className="text-xl">{t(TRANSLATOR_NAME)}</div>
		<div>{t("Input text")}:</div>
		<Textarea className="flex-1" rows={10} defaultValue={text} onChange={(e) => setText(e.target.value)}></Textarea>
		<div className="flex flex-wrap gap-2 items-center">
			{t("Model")}:
			<ModelSelect items={items} value={provider} onChange={m => {
				setProvider(m)
			}}/>
			{t("To")}:
			<ModelSelect items={langs} value={to} onChange={m => {
				setTo(m)
			}}/>

			<div className="flex-1"></div>
			<Button variant="secondary" onClick={handleSettings}><SettingsIcon className="mr-1 h-4 w-4"/>{t("Setting")}
			</Button>
		</div>
		<Button className="w-[200px] mt-2" variant="secondary" disabled={loading} onClick={handleTranslate}>
			{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
			{t("translate")}
		</Button>
		<div className="pt-4">{t("Result")}:</div>
		<Textarea defaultValue={resText} rows={10} readOnly={true}
		          className="flex-[1] border-2 p-2 rounded-sm"></Textarea>
	</div>)
}