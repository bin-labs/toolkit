import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";

export function TextCaseConverter() {
	const [text, setText] = useState<string>("")
	const [resText, setResText] = useState<string>("")

	const toLowerCase = () => {
		setResText(text.toLowerCase())
	}

	const toUpperCase = () => {
		console.log("text", text)
		setResText(text.toUpperCase())
	}

	return (
		<div className="flex flex-col gap-2 h-full">
			<div>Text Case Converters</div>
			<div>Input text:</div>
			<Textarea className="flex-1" rows={10} defaultValue={text} onChange={(e) => setText(e.target.value)}></Textarea>
			<div className="flex flex-wrap gap-2">
				<Button variant="secondary" onClick={toLowerCase}>lower case</Button>
				<Button variant="secondary" onClick={toUpperCase}>UPPER CASE</Button>
			</div>

			<div className="pt-4">Result:</div>
			<Textarea defaultValue={resText} rows={10} readOnly={true} className="flex-[1] border-2 p-2 rounded-sm"></Textarea>
		</div>
	)
}