import {createModule} from "@/core";
import {addTools} from "@/lib/module";
import {translator} from "@/modules/ai/translator/tool";

export default createModule(
	m => addTools(m, translator())
)