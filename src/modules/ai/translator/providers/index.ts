import {Translator} from "@/modules/ai/translator/providers/translate";
import {DefaultProvider} from "@/modules/ai/translator/providers/default";
import {OpenAIProvider} from "@/modules/ai/translator/providers/openai";


const translator = new Translator(([
	new DefaultProvider(),
	new OpenAIProvider("gpt-3.5-turbo", "gpt-3.5-turbo"),
	new OpenAIProvider("gpt-4", "gpt-4"),
	new OpenAIProvider("gpt-4-1106-preview", "gpt-4-1106-preview"),

]))

export * from "./translate";

export default translator;