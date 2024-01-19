import {GetUserData, SetUerData} from "wails/go/settings/Settings";

export type OpenAIStoreData = {
	apiKey: string
	baseURL?: string
}

export function getOpenAIData(): Promise<OpenAIStoreData | null> {
	return GetUserData('openai.apikey')
}

export function saveOpenAIData(data: OpenAIStoreData) {
	return SetUerData('openai.apikey', data)
}