import {createModule} from "@/core"
import {getConverters} from "@/modules/text/convert";
import {addTools} from "@/lib/module";

export default createModule(
	m => {
		addTools(m, ...getConverters())
	}
)