import {useEffect, useState} from "react";

export function useLocalState<T>(key: string, initialState: T) {
	const [state, setState] = useState<T>(() => {
		const item = localStorage.getItem(key)
		if (item) {
			return JSON.parse(item)
		}
		return initialState
	})
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state))
	}, [state]);
	return [state, setState] as const
}