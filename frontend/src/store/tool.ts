import {GetUserData, SetUerData} from "wails/go/settings/Settings";

export type UserToolStoreData = {
	name: string,
	tools: { name: string }[]
}

export function saveUserTools(userTools: UserToolStoreData[]) {
	return SetUerData('userTools', userTools)
}

export async function getUserTools(): Promise<UserToolStoreData[]> {
	return await GetUserData('userTools')
}
