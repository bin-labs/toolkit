import {
	autoLanguage,
	ITranslateProvider,
	Language,
	LanguageList,
	TranslateError,
	TranslateParams
} from "@/modules/ai/translator/providers/translate";

import OpenAI from 'openai';
import {getOpenAIData, saveOpenAIData} from "@/store/openai";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useTranslation} from "react-i18next";
import {useGlobalDialog} from "@/components/dialog";

const languages: Language[] = [
	{label: "English", value: "en"},
	{label: "简体中文", value: "zh"},
	{label: "繁體中文", value: "zh-TW"},
	{label: "日本語", value: "ja"},
	{label: "한국어", value: "ko"},
	{label: "العربية", value: "ar"},
]

function OpenAISetting() {
	const [text, setText] = useState("")
	const [baseURL, setBaseURL] = useState<string>("https://api.openai.com/v1")
	const {t} = useTranslation()

	const {close} = useGlobalDialog()

	const save = async () => {
		await saveOpenAIData({apiKey: text, baseURL: baseURL})
		close()
	}

	useEffect(() => {
		(async () => {
			const data = await getOpenAIData()
			setText(data?.apiKey ?? "")
			setBaseURL(data?.baseURL ?? "")
		})()
	}, [])

	return (
		<>
			<div className="flex items-center gap-4">
				<span>API Key:</span>
				<Input className="flex-1" type="text" value={text} onChange={e => setText(e.target.value)}/>
			</div>
			<div className="flex items-center gap-4">
				<span>Endpoint:</span>
				<Input className="flex-1" type="text" value={baseURL} onChange={e => setBaseURL(e.target.value)}/>
			</div>
			<div className="flex items-center gap-2">
				<div className="flex-1"></div>
				<Button onClick={() => {
					close()
				}} variant="outline">{t("Cancel")}</Button>
				<Button onClick={save}>{t("Confirm")}</Button>
			</div>
		</>
	)
}

export class OpenAIProvider implements ITranslateProvider {
	public readonly name: string
	public readonly settingContent = <OpenAISetting/>

	constructor(public readonly model: string, public readonly label: string) {
		this.name = model
	}

	getLanguages(): Promise<LanguageList> {
		return Promise.resolve({
			toLang: languages,
			defaultFrom: autoLanguage.value,
			fromLang: [autoLanguage, ...languages],
			defaultTo: "en",
		})
	}

	async translate(params: TranslateParams): Promise<string> {
		const data = await getOpenAIData()
		if (!data || !data.apiKey) {
			throw new TranslateError("SettingsError", "Please set Open AI API Key in settings")
		}
		const openai = new OpenAI({
			apiKey: data.apiKey,
			baseURL: data.baseURL,
			dangerouslyAllowBrowser: true,
		});
		const stream = await openai.chat.completions.create({
			model: this.name,
			messages: [{role: 'user', content: `Translate the following text to ${params.to}.\n${params.text}`}],
			stream: true,
		});
		let text = ""
		for await (const chunk of stream) {
			text += chunk.choices[0]?.delta?.content || ''
			params.callback?.(text)
		}
		return Promise.resolve(text);
	}
}