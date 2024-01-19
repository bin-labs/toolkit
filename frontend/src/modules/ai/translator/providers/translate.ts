import {ReactNode} from "react";

export interface TranslateParams {
	text: string
	to: string
	from?: string
	callback?: (result: string) => void
}

export interface Language {
	value: string
	label: string
}

export interface LanguageList {
	toLang: Language[]
	fromLang?: Language[]
	defaultTo?: string
	defaultFrom?: string
}

export type TranslateErrorCode = "SettingsError" | "TranslateError"

export interface ITranslateProvider {
	name: string
	label?: string
	settingContent?: ReactNode

	translate(p: TranslateParams): Promise<string>

	getLanguages(): Promise<LanguageList>
}

export class TranslateError {
	code: TranslateErrorCode
	message?: string

	constructor(code: TranslateErrorCode, msg?: string) {
		this.code = code;
		this.message = msg;
	}
}

export class Translator {
	constructor(protected providers: ITranslateProvider[]) {
	}

	public translate(provider: string, params: TranslateParams): Promise<string> {
		const providerInstance = this.providers.find(p => p.name === provider);
		if (!providerInstance) {
			throw new Error(`Provider ${provider} not found`);
		}
		return providerInstance.translate(params);
	}

	public getLanguages(provider: string): Promise<LanguageList> {
		const providerInstance = this.providers.find(p => p.name === provider);
		if (!providerInstance) {
			throw new Error(`Provider ${provider} not found`);
		}
		return providerInstance.getLanguages();
	}

	public getProviders(): ITranslateProvider[] {
		return this.providers;
	}
}