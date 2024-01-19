import {useEffect, useState} from "react";

export function useLocalState(key: string, initialState: string) {
	const [state, setState] = useState<string>(() => {
		const item = localStorage.getItem(key)
		if (item) {
			return item
		}
		return initialState
	})
	useEffect(() => {
		if (state === initialState) {
			localStorage.removeItem(key)
		} else {
			localStorage.setItem(key, state)
		}
	}, [state]);
	return [state, setState] as const
}