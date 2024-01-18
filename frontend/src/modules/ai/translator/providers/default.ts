import {ITranslateProvider, LanguageList, TranslateParams} from "@/modules/ai/translator/providers/translate";

export class DefaultProvider implements ITranslateProvider {
	name = "default";
	label = "默认翻译器";

	async translate(params: TranslateParams): Promise<string> {
		const res = await fetch("https://api.translate.zvo.cn/translate.json?v=2.2.2.20230216", {
			method: "POST",
			body: new URLSearchParams({
				to: params.to,
				text: JSON.stringify([params.text]),
			}),
		}).then(res => res.json())
		return Promise.resolve(res.text[0]);
	}

	async getLanguages(): Promise<LanguageList> {
		const res = await fetch("https://api.translate.zvo.cn/language.json").then(res => res.json());
		const items = res.list.map((item: any) => ({
			label: item.name,
			value: item.id,
		}))
		return {
			items,
			defaultValue: "english",
		}
	}
}