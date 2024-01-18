import {GlobeIcon} from "@radix-ui/react-icons";
import {TranslatePage} from "@/modules/ai/translator/TranslatePage";

export const TRANSLATOR_NAME = "ai.translator"

export function translator() {
	return {
		name: TRANSLATOR_NAME,
		description: TRANSLATOR_NAME+".description",
		icon: <GlobeIcon width={18} height={18}/>,
		tags: ["translator", "AI"],
		element: <TranslatePage/>,
	}
}