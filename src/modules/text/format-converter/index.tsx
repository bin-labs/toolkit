import {JSON_CONVERTER_NAME} from "@/modules/text/format-converter/consts";
import {FormatConverterPage} from "@/modules/text/format-converter/FormatConverterPage";
import {CodeIcon} from "@radix-ui/react-icons";

export function formatConverter() {
	return {
		name: JSON_CONVERTER_NAME,
		description: JSON_CONVERTER_NAME+".description",
		tags: ["converter"],
		element: <FormatConverterPage/>,
		icon: <CodeIcon/>
	}
}
