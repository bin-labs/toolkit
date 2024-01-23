import { getData, setData } from "./local"

export type UserToolStoreData = {
	name: string,
	tools: { name: string }[]
}

export function saveUserTools(userTools: UserToolStoreData[]) {
	return setData('userTools', userTools)
}

export async function getUserTools(): Promise<UserToolStoreData[] | null> {
	return await getData<UserToolStoreData[]>('userTools')
}
