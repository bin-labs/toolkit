import {Translator} from "@/modules/ai/translator/providers/translate";
import {DefaultProvider} from "@/modules/ai/translator/providers/default";


const translator = new Translator(([
	new DefaultProvider(),
]))

export * from "./translate";

export default translator;