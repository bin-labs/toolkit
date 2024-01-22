import MonacoEditor from 'react-monaco-editor';
import {MonacoEditorProps} from "react-monaco-editor/src/types";
import {useTheme} from "@/context/theme";

function convertTheme(theme: "dark" | "light") {
	if (theme === "dark") {
		return "vs-dark"
	} else {
		return "vs-light"
	}
}

export function CodeEditor(props: Omit<MonacoEditorProps, "theme">) {
	const {current} = useTheme()
	return (<MonacoEditor theme={convertTheme(current)} {...props}/>)
}