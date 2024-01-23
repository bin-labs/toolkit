import { getData, setData } from "./local"

export type OpenAIStoreData = {
	apiKey: string
	baseURL?: string
}

export function getOpenAIData(): Promise<OpenAIStoreData | null> {
	return getData('openai.config')
}

export function saveOpenAIData(data: OpenAIStoreData) {
	return setData('openai.config', data)
}