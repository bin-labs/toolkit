import {createModule} from "@/core"
import {getConverters} from "@/modules/text/convert";
import {addTools} from "@/lib/module";
import {formatConverter} from "@/modules/text/format-converter";

export default createModule(
	m => {
		addTools(m, ...getConverters(), formatConverter())
	}
)