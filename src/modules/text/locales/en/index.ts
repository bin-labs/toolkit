import {pinyinConverter, textConverter} from "@/modules/text/convert";
import {JSON_CONVERTER_NAME} from "@/modules/text/format-converter/consts";

const en = {
	[textConverter]: "Text case converter",
	[pinyinConverter]: "Pinyin converter",
	[JSON_CONVERTER_NAME]: "Format converter",
	[JSON_CONVERTER_NAME + ".description"]: "Supports the mutual conversion of text formats such as JSON, YAML, and XML.",
}

export default en;