import {useNavigate} from "react-router-dom";

export function useGo() {
	const navigate = useNavigate()
	return (url?: string) => {
		if (url) {
			navigate(url)
		}
	}
}