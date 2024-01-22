import {pinyinConverter, textConverter} from "@/modules/text/convert";
import {JSON_CONVERTER_NAME} from "@/modules/text/format-converter/consts";

const en = {
	[textConverter]: "文本转换器",
	[pinyinConverter]: "中文转拼音",
	[JSON_CONVERTER_NAME]: "格式转换",
	[JSON_CONVERTER_NAME + ".description"]: "支持json、yaml、xml等格式文本进行互相转换",
	"convert text to pinyin": "将文本中的中文转为拼音",
	"Input text": "输入文本",
	"lower case": "转为小写",
	"UPPER CASE": "转为大写",
	"Result": "结果",
	"Convert": "转换"
}

export default en;