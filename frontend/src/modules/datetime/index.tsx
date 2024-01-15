import {createModule} from "@/core";
import {addConverters} from "@/modules/datetime/converter";

export default createModule(
	addConverters,
)