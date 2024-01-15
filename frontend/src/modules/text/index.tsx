import {createModule} from "@/core"
import {addConverters} from "@/modules/text/convert";

export default createModule(
	addConverters,
)