import {
	ITranslateProvider,
	LanguageList,
	TranslateError,
	TranslateParams
} from "@/modules/ai/translator/providers/translate";

import OpenAI from 'openai';
import {getOpenAIData} from "@/store/openai";
import {ReactNode} from "react";

export class OpenAIProvider implements ITranslateProvider {
	public readonly name: string

	constructor(public readonly model: string, public readonly label: string) {
		this.name = model
	}

	settingContent?: ReactNode;

	getLanguages(): Promise<LanguageList> {
		throw new Error("Method not implemented.");
	}

	async translate(params: TranslateParams): Promise<string> {
		const apiKey = (await getOpenAIData())?.apiKey
		if (!apiKey) {
			throw new TranslateError("SettingsError", "Please set Open AI API Key in settings")
		}
		const openai = new OpenAI({apiKey: apiKey});
		const stream = await openai.chat.completions.create({
			model: this.name,
			messages: [{role: 'user', content: 'Say this is a test'}],
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